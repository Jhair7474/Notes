import { ActionButton, ActionButtonProps } from "./ActionButton";
import { LuSignature } from 'react-icons/lu'

export const NewNoteButton = ({...props}: ActionButtonProps) => {
    return(
        <ActionButton {...props}>
            <LuSignature className="w-4 h-4 text-zinc-300"/>
        </ActionButton>
    )
}