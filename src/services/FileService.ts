import Service from "./Service";

interface File {
  originalName: string;
  fileSize: number;
  sessionId: string;
}

export default class FileService extends Service {
  constructor() {
    super();
  }

  async getPresignedUrl(file: File, fileType: string) {
    const response = await this.axiosInstance.post(`/files/${file.sessionId}`, {
      file,
      fileType
    });

    console.log(response.data)
    
    return response.data;
  }

  async getDownloadUrl(fileId: string){
    const response = await this.axiosInstance.get(`/files/download/${fileId}`)

    return response.data
  }
}
