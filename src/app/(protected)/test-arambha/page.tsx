import ArambhaForm from "@/components/forms/ArambhaForm";

const Register = () => {
    return (
        <div>
            <ArambhaForm
                title="Arambha Yoga Registration"
                description="Join our Arambha Yoga program to enhance your well-being and learn the fundamentals of yoga."
                leftImage={{ url: '/images/arambha-left.jpg' }} // Replace with actual path
                rightImage={{ url: '/images/arambha-right.jpg' }} // Replace with actual path
            />
        </div>
    );
}

export default Register;