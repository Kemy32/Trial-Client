import ChefSalad from "../../../assets/images/chef-salad.png";

export default function AchievementsSection() {
  const achievements = [
    {
      number: "3",
      title: "Locations",
    },
    {
      number: "1995",
      title: "Founded",
    },
    {
      number: "65+",
      title: "Staff Members",
    },
    {
      number: "100%",
      title: "Satisfied Customers",
    },
  ];

  return (
    <section className="py-20 bg-light-coffee">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="flex-1">
          <div className="flex flex-col items-start gap-6 mb-12">
            <h1 className="font-heading text-4xl md:text-5xl text-dark-gray leading-tight">
              A little information for our valuable guest
            </h1>
            <p className="text-md text-dark-gray leading-relaxed max-w-xl">
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable
              event.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center border border-grayish rounded-2xl bg-white py-8 px-4 gap-2 shadow-sm"
              >
                <h1 className="text-4xl md:text-5xl font-heading text-crimson">
                  {achievement.number}
                </h1>
                <p className="font-bold text-dark-gray text-center text-sm md:text-base">
                  {achievement.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end">
          <img
            className="w-full max-w-[500px] h-auto object-contain"
            src={ChefSalad}
            alt="chef making a salad"
          />
        </div>
      </div>
    </section>
  );
}
