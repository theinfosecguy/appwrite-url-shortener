import { Appwrite, Query } from "appwrite";
import { Server } from "../config/config";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    api.sdk = appwrite;
    return appwrite;
  },

  createAccount: (email, password, name) => {
    console.log("createAccount");
    return api.provider().account.create("unique()", email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, "unique()", data, read, write);
  },

  listDocuments: (collectionId, id) => {
    return api
      .provider()
      .database.listDocuments(collectionId, [Query.equal(`userID`, id)]);
  },

  listDocumentsByLongURL: (collectionId, url) => {
    return api
      .provider()
      .database.listDocuments(collectionId, [Query.equal(`longURL`, url)]);
  },

  listDocumentsByShortURL: (collectionId, url) => {
    return api
      .provider()
      .database.listDocuments(collectionId, [Query.equal(`shortURL`, url)]);
  },

  queryURLs: (collectionId, query) => {
    return api
      .provider()
      .database.listDocuments(collectionId, [Query.equal(`shortURL`, query)]);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
