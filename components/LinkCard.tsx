import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as LucideIcons from "lucide-react";
import { CircleX, GripVertical } from "lucide-react";

const IconComponent = ({ iconName }: { iconName: string }) => {
  // @ts-ignore
  const Icon = LucideIcons[iconName];
  return Icon ? <Icon className="h-5 w-5" /> : null;
};

export const LinkCard = ({
  title,
  description,
  icon,
  onDelete,
}: {
  title: string;
  description: string;
  icon: string;
  onDelete: () => void;
}) => {
  return (
    <Alert className="cursor-pointer flex flex-row justify-between">
      <GripVertical className="h-6 w-6 text-muted-foreground" />

      <div className="flex flex-col ml-2">
        <div className="flex items-center space-x-2">
          <IconComponent iconName={icon} />
          <AlertTitle>{title}</AlertTitle>
        </div>

        <AlertDescription className="text-muted-foreground">
          {description}
        </AlertDescription>
      </div>
      <span
        className="cursor-pointer items-center flex w-fit"
        onClick={onDelete}
      >
        <CircleX className="h-6 w-6" />
      </span>
    </Alert>
  );
};