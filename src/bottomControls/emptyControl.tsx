import React from 'react';

type EmptyControlProps = {};

const EmptyControl: React.FC<EmptyControlProps> = () => {
    return (
        <div className="bottom-container" style={{ padding: 0 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <img
                    src={process.env.PUBLIC_URL + '/banner.png'}
                    style={{ height: '100%', width: 'auto' }}
                    alt="A+ Courses Tutorial Builder"
                />
            </div>
        </div>
    );
};

export default EmptyControl;
