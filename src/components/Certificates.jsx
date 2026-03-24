const certificates = [
    {
        name: "Research Paper — ICICI 2026",
        issuer: "Accepted at International Conference",
        date: "2026",
        link: "https://github.com/Maheshbabu777/Transformer-text-classification/blob/main/IEEE.pdf",
    },
    {
        name: "OCI Generative AI Professional",
        issuer: "Oracle University",
        date: "Oct 2025",
        link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=30DBF7665730981E6AD363EA3592D5E5C2802AE613B8C997FD1672545FB4205D",
    },
    {
        name: "Master Generative AI & Generative AI tools",
        issuer: "Udemy",
        date: "Aug 2025",
        link: "https://www.udemy.com/certificate/UC-b5dc0201-6777-4871-a1f2-fb3ced2f5561/",
    },
    {
        name: "Data Structures and Algorithm",
        issuer: "NeoColab",
        date: "Dec 2024",
        link: "https://drive.google.com/file/d/19v-SZPfi2cgULLXr0EzD6Tb7sX6xWXYr/view?usp=drive_link",
    },
];

const Certificates = () => {
    return (
        <section id='certificates' className="px-4 sm:px-6 md:px-20 py-16 md:py-24 w-full">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-10">
                    <h2 className="text-white text-3xl md:text-5xl font-light mb-8 text-center">
                        <span className="text-[#f8401a]">{'{ '}</span>
                        <span className="italic text-4xl md:text-6xl font-extralight tracking-wide">Certificates</span>
                        <span className="text-[#f8401a]">{' }'}</span>
                    </h2>
                    <p className="text-white/70 font-light text-xl leading-normal text-center mb-12">
                        Credentails and achievements I've earned.
                    </p>
                </div>

                <div className="md:mx-20 flex flex-col">
                    {certificates.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-white/20 text-sm font-light w-6 text-right">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <p className="text-white font-light text-lg group-hover:text-[#f8401a] transition-all duration-300">
                                        {cert.name}
                                    </p>
                                    <p className="text-white/40 text-sm font-light mt-1">
                                        {cert.issuer} · {cert.date}
                                    </p>
                                </div>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4 text-white/20 group-hover:text-[#f8401a] group-hover:rotate-45 transition-all duration-300 shrink-0"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;