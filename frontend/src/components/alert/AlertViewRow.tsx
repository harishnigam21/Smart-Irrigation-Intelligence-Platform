import { useLongPress } from "@/hooks/useLongPress";
import { Alert } from "@/store/slices/AlertSlice";

export default function AlertViewRow({
  item,
  isSelected,
  selectedAlertsLength,
  handleSelection,
  children,
}: {
  item: Alert;
  isSelected: boolean;
  selectedAlertsLength: number;
  handleSelection: (isSelected: boolean, item: Alert) => void;
  children: React.ReactNode;
}) {
  const { bindClick, ...longPressListeners } = useLongPress(
    () => handleSelection(isSelected, item),
    {
      ms: 300,
    },
  );

  return (
    <div
      {...longPressListeners}
      onContextMenu={(e) => e.preventDefault()}
      onClick={bindClick(() => {
        if (selectedAlertsLength > 0) {
          handleSelection(isSelected, item);
        }
      })}
      className={`relative group transition-all py-2 px-2.5 border-b border-txlight/10 w-full gap-4 grid grid-cols-[minmax(120px,1fr)_minmax(40px,max-content)] sm:grid-cols-[minmax(40px,200px)_minmax(120px,1fr)_minmax(40px,max-content)] hover:shadow-sm active:shadow-sm hover:shadow-txlight active:shadow-txlight overflow-hidden items-center justify-between cursor-pointer ${item.status ? "" : "bg-bgprimary/80"} ${isSelected && "bg-blue-500/30"} text-sm`}
    >
      {children}
    </div>
  );
}
