import Icons from "../ui/Icons";

export default function Contact({ heading, data }) {
  return (
    <section className="section contact">
      <h3>{heading}</h3>

      <div className="contact-details">
        {data.email && (
          <div className="contact-row">
            <Icons.email />
            <span>{data.email}</span>
          </div>
        )}

        {data.phone && (
          <div className="contact-row">
            <Icons.phone />
            <span>{data.phone}</span>
          </div>
        )}

        {data.location && (
          <div className="contact-row">
            <Icons.location />
            <span>{data.location}</span>
          </div>
        )}
      </div>

      {data.links?.length > 0 && (
        <div className="contact-links">
          {data.links.map((link, index) => {
            const Icon = Icons[link.type];

            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {Icon && <Icon />}
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
