import React from 'react';
import Navigation from './Navba';

const AboutUsPage = () => {
    return (
        <div>
            <Navigation/>

            <br/> <br/><br/> <br/>
            <div style={{
                textAlign: 'center',
                margin: '0 auto',
                maxWidth: '600px',
                padding: '20px',
                border: '1px solid #ccc',
                borderColor: '#5b4db7',
                borderRadius: '10px',
                boxShadow: '0 10px 20px 0 rgba(232,181,232,1)',
                borderStyle: 'solid',
            }}
            >
                <h1
                    style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        textDecoration: 'underline black',
                        color: '#701d8d',
                    }}>

                    About Us
                </h1>
                <p>
                    Welcome to our website!<br/> We are a team of students who are passionate about creating
                    innovative solutions. Our names are Zeliha, Ibrahim and Aleksandr, and we are the founders of
                    this amazing generator.
                </p>
                <p>
                    As students, we constantly seek opportunities to learn and grow. We believe in the power
                    of technology to transform the world, and that's why we came together to build this
                    generator. Our goal is to make life easier for everyone by providing useful tools that
                    solve everyday problems.
                </p>
                <p>
                    With a strong focus on user experience and quality, we strive to deliver the best
                    products possible. We are constantly improving and adding new features to ensure that our
                    generator meets the needs of our users.
                </p>
                <p>
                    Thank you for visiting our website and supporting our work. <br/> We hope you find our
                    generator helpful and enjoyable to use. <br/> If you have any feedback or questions, please
                    don't hesitate to contact us.
                </p>
            </div>
            <br/>
        </div>
    );
};

export default AboutUsPage;
