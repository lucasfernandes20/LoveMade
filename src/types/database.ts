/**
 * Tipos para as tabelas do banco de dados
 */

export type User = {
  id: string;
  created_at: string;
  email: string;
  updated_at: string;
};

export type Page = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  title: string;
  message?: string;
  page_slug: string;
  page_url: string;
  plan: string;
};

export type CommemorativeDate = {
  id: string;
  created_at: string;
  page_id: string;
  name?: string;
  date?: string;
  style?: string;
};

export type MusicDetail = {
  id: string;
  created_at: string;
  page_id: string;
  video_id: string;
  display_name?: string;
  artist_name?: string;
  track_name?: string;
  album_cover?: string;
  preview_url?: string;
  duration?: number;
  embed_url?: string;
  youtube_url?: string;
};

export type Payment = {
  id: string;
  created_at: string;
  updated_at: string;
  page_id?: string;
  user_id?: string;
  stripe_payment_id?: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  metadata?: any;
};

export type Image = {
  id: string;
  created_at: string;
  page_id: string;
  url: string;
};

/**
 * Interface para retorno completo dos dados de uma página
 */
export interface PageWithDetails {
  page: Page;
  commemorativeDate?: CommemorativeDate;
  musicDetails?: MusicDetail;
  images: Image[];
}
