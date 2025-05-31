import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

const MAIN_PATH = "images";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase
let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Exportar instância do Storage
export const storage = getStorage(firebaseApp);

// Interface para resultado de upload de imagem
export interface UploadResult {
  url: string;
  fullPath: string;
}

/**
 * Faz upload de uma imagem para o Firebase Storage
 * @param file Arquivo a ser enviado
 * @param path Caminho onde o arquivo será armazenado
 * @returns Objeto com URL e caminho completo do arquivo enviado
 */
export const uploadImage = async (
  file: File,
  path: string
): Promise<UploadResult> => {
  try {
    // Criar nome único para o arquivo
    const fileName = `${file.name.replace(
      /[^a-zA-Z0-9.]/g,
      "_"
    )}-${Date.now()}`;

    // Criar referência para o arquivo no storage
    const storageRef = ref(storage, `${path}/${fileName}`);

    // Fazer upload do arquivo
    const snapshot = await uploadBytes(storageRef, file);

    // Obter URL do arquivo
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      fullPath: snapshot.ref.fullPath,
    };
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw error;
  }
};

/**
 * Faz upload de múltiplas imagens
 * @param files Array de arquivos a serem enviados
 * @param path Caminho base onde os arquivos serão armazenados
 * @returns Array de objetos com URLs e caminhos completos das imagens enviadas
 */
export const uploadMultipleImages = async (
  files: File[],
  path: string
): Promise<UploadResult[]> => {
  try {
    const uploadPromises = files.map((file) =>
      uploadImage(file, `${MAIN_PATH}/${path}`)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error);
    throw error;
  }
};

/**
 * Remove uma imagem do Firebase Storage
 * @param fullPath Caminho completo da imagem a ser removida
 */
export const deleteImage = async (fullPath: string): Promise<void> => {
  try {
    const imageRef = ref(storage, fullPath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Erro ao remover imagem:", error);
    throw error;
  }
};

/**
 * Remove múltiplas imagens do Firebase Storage
 * @param paths Array de caminhos completos das imagens a serem removidas
 * @returns Array de resultados das operações (sucesso ou erro)
 */
export const deleteMultipleImages = async (
  paths: string[]
): Promise<{ success: boolean; path: string; error?: any }[]> => {
  const deletePromises = paths.map(async (path) => {
    try {
      await deleteImage(path);
      return { success: true, path };
    } catch (error) {
      return { success: false, path, error };
    }
  });

  return await Promise.all(deletePromises);
};

/**
 * Busca múltiplas imagens do Firebase Storage
 * @param pageSlug path param da página
 * @returns Array com URLs completas das imagens
 */
export const listImages = async (pageSlug: string): Promise<string[]> => {
  try {
    const imagesRef = ref(storage, `${MAIN_PATH}/${pageSlug}`);
    const result = await listAll(imagesRef);

    const urlPromises = result.items.map((item) => getDownloadURL(item));
    return await Promise.all(urlPromises);
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    return [];
  }
};
