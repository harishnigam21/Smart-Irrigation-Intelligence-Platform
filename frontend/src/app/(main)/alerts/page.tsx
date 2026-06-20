import AlertInteractionHeader from "@/components/alert/AlertInteractionHeader";
import type { Alert } from "@/store/slices/AlertSlice";
import { Data } from "@/types/data";
import { serverFetch } from "@/utils/serverApi";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function Alert({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams();
  if (resolvedParams.page) {
    params.append("page", String(resolvedParams.page));
  } else {
    if (resolvedParams.cursor)
      params.append("cursor", String(resolvedParams.cursor));
    if (resolvedParams.direction)
      params.append("direction", String(resolvedParams.direction));
  }
  if (resolvedParams.st === "1") params.append("st", "1");
  if (resolvedParams.sr === "1") params.append("sr", "1");
  if (resolvedParams.tr === "1") params.append("tr", "1");
  if (resolvedParams.im === "1") params.append("im", "1");

  const response = await serverFetch(`api/alerts?${params.toString()}`, "GET");
  const data = response.data as Data<Alert[]> | null;

  return (
    <article className="relative w-full h-[98%] flex flex-col justify-between mx-3 bg-bgsecondary rounded-xl overflow-hidden">
      <AlertInteractionHeader data={data || null} />
      <div className="w-full flex items-center justify-center py-2">
        <small className="text-[10px] text-txlight">
          Terms · Privacy · Program Policies
        </small>
      </div>
    </article>
  );
}
