const education = [
    {
        degree: "Bachelor of Technology - Computer Science and Engineering",
        school: "Lovely Professional University",
        location: "Phagwara, Punjab",
        date: "Aug’ 23 - Present",
        grade: "CGPA: 9.00"
    },
    {
        degree: "Intermediate",
        school: "Sri Narayana Junior College",
        location: "Guntur, Andhra Pradesh",
        date: "Jun’ 22 – Apr’ 23",
        grade: "Percentage: 98.2%"
    },
    {
        degree: "Matriculation",
        school: "Sri Kondaveedu Public School",
        location: "Guntur, Andhra Pradesh",
        date: "Jun’ 20 – Apr’ 21",
        grade: "CGPA: 10.0"
    }
];

const Education = () => {
    return (
        <section id='education' className="px-4 sm:px-6 md:px-20 py-16 md:py-24 w-full">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-10">
                    <h2 className="text-white text-3xl md:text-5xl font-light mb-8 text-center">
                        <span className="text-[#f8401a]">{'{ '}</span>
                        <span className="italic text-4xl md:text-6xl font-extralight tracking-wide">Education</span>
                        <span className="text-[#f8401a]">{' }'}</span>
                    </h2>
                    <p className="text-white/70 font-light text-xl leading-normal text-center mb-12">
                        My academic background and qualifications.
                    </p>
                </div>

                <div className="md:mx-20 flex flex-col">
                    {education.map((edu, index) => (
                        <div
                            key={index}
                            className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-white/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-white/20 text-sm font-light w-6 text-right">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <p className="text-white font-light text-lg group-hover:text-[#f8401a] transition-all duration-300">
                                        {edu.degree}
                                    </p>
                                    <p className="text-white/40 text-sm font-light mt-1">
                                        {edu.school} · {edu.location} · {edu.date}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="text-white/60 text-sm font-light px-3 py-1 border border-white/10 rounded-full group-hover:border-[#f8401a]/30 group-hover:text-[#f8401a] transition-all duration-300">
                                    {edu.grade}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
