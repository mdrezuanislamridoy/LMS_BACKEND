export interface IModuleContent {
  title: string;
  thumbnail: {
    imageUrl: string;
    publicId: string;
  };
  videoUrl: string;
  description: string;
}

export interface IModules extends IModuleContent {
  title: string;
  content: IModuleContent[];
  isLive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
