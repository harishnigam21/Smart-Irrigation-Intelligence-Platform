interface Pagination {
  nextCursor?: string | null;
  prevCursor?: string | null;
  totalPages?: number;
  currentPage?: number;
}
export interface Data<T> {
  data?: T;
  message: string;
  status?: boolean;
  issue?: boolean;
  acTk?: string;
  errors?: Record<string, string>;
  pagination?: Pagination;
}
