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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-evenly ">
        <div className="w-xl">
          <div className="flex flex-col items-start gap-5 mb-10 mt-10 max-w-120">
            <h1 className="font-heading text-5xl">
              A little information for our valuable guest
            </h1>
            <p className="text-sm text-dark-gray">
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable
              event.
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-5 w-lg">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center border border-grayish rounded-md bg-white py-6 gap-4"
              >
                <h1 className="text-5xl font-heading font-normal">
                  {achievement.number}
                </h1>
                <p>{achievement.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-lg">
          <img className="h-150" src={ChefSalad} alt="chef making a salad" />
        </div>
      </div>
    </section>
  );
}
