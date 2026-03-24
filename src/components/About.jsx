const About = () => {
  return (
    <section id="about" className="px-4 sm:px-6 md:px-20 py-16 md:py-24 justify-center items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="lg:ml-40 max-w-7xl">
          <h2 className="text-white text-3xl md:text-5xl font-light mb-8">
            <span className="text-[#f8401a]">{'{ '}</span>
             <span className="italic">About Me...</span>
             <span className="text-[#f8401a]">{' }'}</span>
          </h2>

          <div className="space-y-10 text-white/70 font-light text-lg leading-normal">
            <p>
              I'm Mahesh Babu from Guntur, India. Ever since I was a kid, 
              I've been fascinated by how things work under the hood, 
              which led me to pursue engineering. That curiosity still drives me 
              today as I focus on solving real-world problems through technology.
            </p>
            <p>
              I'm a Software Engineer and Machine Learning enthusiast with a strong 
              inclination toward building practical solutions. I enjoy learning by 
              implementing constantly exploring new technologies and currently 
              focusing on applying AI to make systems smarter and more efficient.
            </p>
            <p>
              Beyond development, I spend my time playing multiplayer games and 
              staying active with physical sports, which help me stay balanced 
              and refreshed.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;