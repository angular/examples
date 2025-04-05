/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Injectable, Inject } from '@angular/core';
import { FirebaseApp } from "@angular/fire/app";
import { getVertexAI, getGenerativeModel, GenerativeModel } from "firebase/vertexai";

@Injectable({
  providedIn: 'root'
})
export class AiService {
  readonly model: GenerativeModel;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: FirebaseApp) {
    // Initialize the Vertex AI service
    const vertexAI = getVertexAI(this.firebaseApp);

    // Initialize the generative model with a model that supports your use case
    this.model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });
  }

  async ask(prompt: string) {
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    return response.text();
  }
}
