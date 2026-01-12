export default function RestaurantMapSection() {
  return (
    <div className="w-full h-full overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.2031277493725!2d30.943179275546765!3d29.973591821924266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145856f75d85b515%3A0xe7c2db36cec22c6a!2sKoshary%20El%20Tahrir!5e0!3m2!1sen!2sde!4v1764108854282!5m2!1sen!2sde"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowfullscreen={false}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Koshary El Tahrir Location Map"
      ></iframe>
    </div>
  );
}
