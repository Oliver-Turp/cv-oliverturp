export default function Interests({ heading, data }) {
    return (
        <section className="section interests">
            <h3>{heading}</h3>

            {data.items.map((interest, index) => (
                <div key={index}>

                    {interest.description.split('\n').map((line, i) =>
                        line.startsWith('-') ? (
                            <span key={i}>
                                <strong>{interest.name}</strong>
                                <p>{line.replace('-', '• ').trim()}</p>
                            </span>
                        ) : (
                            <span key={i}>
                                <strong>{interest.name}</strong>
                                <p style={{margin: "0px"}}>{line}</p>
                            </span>
                        )
                    )}
                </div>
            ))}
        </section>
    );
}
