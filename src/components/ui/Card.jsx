import { Link } from "react-router-dom";
export function MenuCard(props) {
  return (
    <>
      <div className="bg-white p-6 md:p-8 border border-coffee rounded-lg text-center shadow-sm">
        <div className="w-20 h-20 mx-auto mb-6 bg-light-coffee rounded-full flex items-center justify-center">
          <img src={props.iconLink} alt={props.alt} className="w-9.5"></img>
        </div>
        <h1 className="text-xl font-bold mb-4">{props.heading}</h1>
        <p className="mb-4">{props.description}</p>
        <Link
          key={props.cardKey}
          to={props.link}
          className="text-crimson text-sm px-2 py-1 font-bold border-2 border-white rounded-full hover:bg-coffee hover:border-coffee hover:shadow-lg transition"
        >
          {props.linkText}
        </Link>
      </div>
    </>
  );
}
export function MenuItemCard(props) {
  return (
    <div className="flex flex-col h-full bg-white border border-light-coffee rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="w-full aspect-16/11 overflow-hidden">
        <img
          src={props.imgLink}
          alt={props.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6 flex flex-col items-center text-center grow">
        <span className="text-crimson font-bold text-xl mb-2">
          {props.price}
        </span>

        <h3 className="text-dark-gray font-extrabold text-lg leading-tight mb-3 line-clamp-1">
          {props.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {props.description}
        </p>
      </div>
    </div>
  );
}

export function ServiceCard(props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-full pt-[75%] relative">
        <img
          src={props.imgLink}
          alt={props.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold font-serif text-dark-gray mb-2">
          {props.title}
        </h3>
        <p className="text-sm text-dark-gray leading-relaxed">
          {props.description}
        </p>
      </div>
    </div>
  );
}

export function TestimonialCard(props) {
  return (
    <div className="bg-light-coffee px-6 py-8 md:px-7 md:py-10 rounded-2xl text-left w-full max-w-sm h-full flex flex-col justify-between">
      <div className="mb-6 pb-5 border-b border-grayish">
        <h1 className="text-xl whitespace-nowrap font-bold text-crimson mb-3">
          {props.heading}
        </h1>
        <p className="text-dark-gray text-sm">{props.paragraph}</p>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
          <img
            className="w-full h-full object-cover"
            src={props.avatarLink}
            alt=""
          />
        </div>
        <div className="flex flex-col text-left ml-2">
          <h2 className="text-black text-sm font-semibold mb-1">
            {props.name}
          </h2>
          <p className="text-xs text-dark-gray">{props.location}</p>
        </div>
      </div>
    </div>
  );
}

export function BlogArticleCard(props) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full w-full`}
    >
      {/* Aspect Ratio Container for Image */}
      <div
        className={`relative w-full overflow-hidden ${props.size === "big"
            ? "aspect-[4/3] md:aspect-auto md:h-full"
            : "aspect-[16/10]"
          }`}
      >
        <img
          src={props.imgLink}
          alt={props.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow text-left gap-3">
        <span className="text-gray-400 font-medium text-xs">
          {formatDate(props.date)}
        </span>

        <h3 className="text-dark-gray font-bold text-lg md:text-xl leading-snug line-clamp-2">
          {props.title}
        </h3>

        {props.size === "big" && (
          <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
            {props.description}
          </p>
        )}
      </div>
    </div>
  );
}
