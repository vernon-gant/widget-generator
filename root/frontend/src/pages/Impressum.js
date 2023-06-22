import React from 'react';
import Navigation from '../components/Navba';

const ImpressPage = () => {
    return (
        <div>
            <Navigation/> <br/> <br/> <br/> <br/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <div
                    style={{
                        textAlign: 'center',
                        maxWidth: '600px',
                        padding: '20px',
                        border: '2px solid #b718d6',
                        borderColor: '#701d8d',
                        borderRadius: '14px',
                        boxShadow: '10px 0px 20px 0 #5b4db7',
                        borderStyle: 'solid',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            textDecoration: 'underline black',
                            color: '#5b4db7',
                        }}
                    >
                        Impressum
                    </h1>
                    <br/>
                    <p>
                        Company Name: Widget Generator Ltd.
                        <br/>
                        Address: Höchststädtplatz, Vienna, Austria
                        <br/>
                        Phone: +43 234 567 890
                        <br/>
                        Email: info@widgetgenerator.com
                    </p>
                    <p>
                        <br/>
                        Commercial Register: ABC12345
                        <br/>
                        VAT ID: DE123456789
                    </p>
                    <br/>
                    <p>
                        This website is operated by Widget Generator Ltd. We do not assume liability for the accuracy,
                        completeness, and timeliness of the provided information.
                        <br/>
                        All content on this website is protected by copyright. Any use without permission is prohibited.
                    </p>
                </div>
            </div>
            <br/>
        </div>
    );
};

export default ImpressPage;
