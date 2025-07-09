

export type DropdownItem = {
    label: string;
    onClick: () => void;
};

export type DropdownProps = {
    buttonText: string;
    items: DropdownItem[];
};