/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {
  effect,
  computed,
  signal,
  resource,
  linkedSignal,
  ResourceStreamItem,
  Injectable
} from '@angular/core';
import {streamFlow} from 'genkit/beta/client';
import { APP_CONTEXT } from './app-context';

const URL = 'generateUI';

@Injectable({
  providedIn: 'root'
})
export class MagicAiService {
  private appContext = APP_CONTEXT;
  private sessionId = signal(crypto.randomUUID());

  prompt = signal<string>('Return a visually rich home page for the application with directions to get started and some possible items/collections/etc. to explore.');
  agentResponse = computed(() => this.componentResource.value()?.agentResponse);
  loadingText = signal(this.appContext.placeholders[this.randomLoadingIndex()]);
  
  componentSchemaList = linkedSignal<FlowResponse|undefined, DynamicElementSchema[]>({
    source: () => this.componentResource.value(),
    computation: (newSchema, prev) => {
      const schema = newSchema?.componentSchema;
      if (!schema) {
        return prev?.value || [];
      } else if (!prev || prev.value.length === 0) {
        return [schema];
      } else if (this.isStreamComplete()) {
        return [...prev.value, schema];
      } else {
        return [...prev.value.slice(0, -1), schema];
      }
    }
  });
  
  isStreamComplete = linkedSignal<FlowResponse|undefined, boolean>({
    source: () => this.componentResource.value(),
    computation: (newSchema) => {
      return !!newSchema?.endOfStream;
    }
  });
  
  componentResource = resource({
    params: () => this.prompt(),
    stream: async ({params}) => {
      const data = signal<ResourceStreamItem<FlowResponse>>({value: {}});
      const response = streamFlow<FlowResponse, any>({
        url: URL,
        input: { 
          appDescription: this.appContext.appDescription,
          message: params,
          sessionId: this.sessionId(),
          componentRegistry: this.appContext.componentContextData.map((c) => ({
            name: c.name,
            description: c.description,
            inputs: Object.keys(c.inputs).map((key) => ({
              name: key,
              ...c.inputs[key],
            })),
          })),
        },
      });

      (async () => {
        try {
          console.log('Stream flow response initiated. Waiting for chunks...');
          for await (const chunk of response.stream) {
            if (chunk) {
              data.update(prev => {
                if (prev && 'value' in prev) {
                  const value = {...prev.value, ...chunk};
                  return {value};
                } else {
                  return { error: chunk as unknown as Error };
                }
              });
            }
          }
          console.log('Stream loop finished. Now awaiting final output...');
        } catch(e) {
          data.set({ error: e as unknown as Error });
        }
      })();
      return data;
    },
  });

  randomLoadingIndex(): number {
    return Math.floor(Math.random() * this.appContext.placeholders.length);
  }

  constructor() {
    effect((onCleanup) => {
      let interval: any;
      const validTypes = ['elementSchema', 'componentSchema', 'textSchema'];

      try {
        const isGenerating = !validTypes.includes(this.componentResource.value()?.componentSchema?.type ?? '');
        if (!interval && (this.componentResource.isLoading() || isGenerating)) {
          interval = setInterval(() => {
            this.loadingText.set(this.appContext.placeholders[this.randomLoadingIndex()]);
          }, 3000);
        }
  
        onCleanup(() => {
          clearInterval(interval);
        });
      } catch (e) {
        console.log('MagicAiService: componentResource error');
      }
    });
  }
}

export type DynamicSchema = DynamicElementSchema | DynamicComponentSchema | TextSchema | undefined;

export interface ViewSchema {
  prompt: string;
  componentSchema: DynamicSchema;
}

export interface FlowResponse {
  agentResponse?: string;
  componentSchema?: DynamicElementSchema;
  endOfStream?: boolean;
}

export interface TextSchema {
  type: 'textSchema';
  text: string;
}

export interface DynamicComponentSchema {
  type: 'componentSchema';
  name: string;
  inputs: {[key: string]: any};
}

export interface DynamicElementSchema {
  type: 'elementSchema';
  element: string;
  attributes?: {[key: string]: string};
  children?: DynamicSchema[];
}

interface DynamicElementListSchema {
  index: number;
  schema: DynamicElementSchema;
  endOfStream?: boolean;
}
