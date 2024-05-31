import { useDraggableLinkCard } from "@/lib/dnd-utils";
import { LinkCard } from "./LinkCard";

export const DraggableLinkCard = ({ link, index, moveLink, onDelete }) => {
  const { ref, isDragging } = useDraggableLinkCard(index, moveLink);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <LinkCard
        title={link}
        description={""}
        icon={""}
        isEditable={true}
        onDelete={() => onDelete()}
      />
    </div>
  );
};
