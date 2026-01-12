import { Link } from "react-router-dom";

export function LinkBtn(props) {
  const btnStyle =
    props.style === "mainBtn"
      ? "bg-crimson text-white border-crimson px-6 py-2.5 hover:bg-coffee hover:text-crimson hover:border-coffee"
      : props.style === "secondaryBtn"
      ? "bg-white text-dark-gray border-dark-gray px-6 py-2.5  hover:bg-coffee hover:text-crimson hover:border-coffee"
      : "bg-black";

  return (
    <>
      <Link
        key={props.btnKey}
        to={props.to}
        className={`${btnStyle} hidden md:block w-fit border-2 rounded-full text-nowrap hover:shadow-md transition-all font-medium`}
      >
        {props.text}
      </Link>
    </>
  );
}
