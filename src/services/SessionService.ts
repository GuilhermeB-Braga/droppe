import Service from "./Service";

interface File {
  id: string;
  createdAt: Date;
  originalName: string;
  savedName: string;
  fileSize: number;
  key: string;
  path: string;
  sessionId: string;
}

interface Session {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  files?: File[];
}

export default class SessionService extends Service {
  constructor() {
    super();
  }

  async createSection(name: string): Promise<Session> {
    const response = await this.axiosInstance.post("/session", { name });

    return response.data;
  }

  async loginSection(name: string, code: string): Promise<string> {
    const response = await this.axiosInstance.post("/session", { name, code });

    return response.data;
  }

  async getSectionById(sessionId: string): Promise<Session> {
    const response = await this.axiosInstance.get(`/session/${sessionId}`);

    return response.data;
  }

  async checkExpiration(sessionId: string){

  }
}
