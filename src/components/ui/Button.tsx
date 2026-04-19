// Just an example of a component, we need to decide if use a style or component library
type Props = {
  label: string;
  onClick: () => void;
};

function Button({ label, onClick }: Props) {
  return <button onClick={onClick}>{label}</button>;
}

export default Button;
