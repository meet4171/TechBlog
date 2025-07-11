

declare global {
    type DropdownItem = {
        label: string;
        onClick: () => void;
    };

    type DropdownProps = {
        buttonText: string;
        items: DropdownItem[];
    };
}
export { }