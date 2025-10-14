export interface IThumbnail {
  imageUrl: string;
  publicId: string;
}
export interface IVideo extends Document {
  title: string;
  thumbnail: IThumbnail;
  videoUrl: string;
  duration: number;
  isFree: boolean;
  description: string;
  createdAt: Date;
}
