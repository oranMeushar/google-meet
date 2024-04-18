import React from 'react';
import {Container, LeftContainer, MainText, SubText, Form, RightContainer, Image} from './homeMainSection.style';
import peopleImg from '../../../resources/images/people.jpg';
const HomeMainSection = () => {
    return (
        <Container>
            <LeftContainer>
                <MainText>
                    Premium video meeting.
                    Now it is available for free to everyone.
                </MainText>
                <SubText>
                    We are redesigning the google meet service
                    for secure business meetings and making it free
                    for everyone to use.
                </SubText>
            </LeftContainer>            

            <RightContainer>
                <Image src={peopleImg}/>
            </RightContainer>
        </Container>
    );
};

export default HomeMainSection;