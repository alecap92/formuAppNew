export interface IFile {
  _id: string;
  name: string;
  category: string;
  fileName: string;
  fileUrl: string;
  fileId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  userId: string;
  etapas: [];
}

export interface IPlan {
  _id: string;
  name: string;
  monthlyDocuments: number;
  templates: number;
  price: number;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  phone: string;
  idType: string;
  idNumber: string;
  email: string;
  address: string;
  settings: Settings;
  city: string;
  state: string;
  address: string;
  companyName: string;
  plan: IPlan;
  documentsUsedThisMonth: number;
  templatesUsed: number;
}

declare module "pdfjs-dist/build/pdf.worker.entry" {
  const workerSrc: string;
  export default workerSrc;
}

export interface Campo {
  label: string;
  key: string;
  type: string;
  value?: string;
  required?: boolean;
  options?: string;
}

export interface Etapa {
  label: string;
  key: Campo[];
  isOpen: boolean;
}

export interface FormValues {
  [key: string]: any;
}
