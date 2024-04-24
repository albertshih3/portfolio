import { Button, Spacer, Image } from "@nextui-org/react";

const Hero = () => {
  return (
    <div className="flex items-center justify-around h-96">
      <div>
        <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
          Hi there! My name is Albert.
        </h1>
        <p className="mb-5" style={{ color: "#777" }}>
          I am a computer science student and aspiring full stack developer.
        </p>
        <Button color="primary">Learn More</Button>
      </div>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Hero Image"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Hero;
