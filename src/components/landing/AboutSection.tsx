import Image from 'next/image';

export default function AboutSection() {
    return (
        <section style={{ background: 'white', padding: '100px 133px' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%', gap: '110px' }}>
                {/* Left Side — Logo */}
                <div style={{ flex: '0 0 560.5px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', opacity: 1, transform: 'rotate(0deg)' }}>
                
                    <div style={{ marginLeft: '0', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        
                        <div id="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '560.5px', height: '290px' }}>
                            <Image
                                src="/brand_assets/cardano-logo-black.svg"
                                width={560.5}
                                height={290}
                                alt="Cardano Logo"
                                priority
                                style={{ width: '560.5px', height: '290px', objectFit: 'contain', display: 'block', opacity: 1, transform: 'rotate(0deg)' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side — Text Content */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', fontFamily: '"Poppins", sans-serif' }}>
                    <div style={{ maxWidth: '720px', width: '100%' }}>
                        <h2
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '10px',
                                fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                                fontWeight: 800,
                                fontSize: '32px',
                                lineHeight: '39px',
                                textAlign: 'left'
                            }}
                        >
                            <span
                                style={{
                                    background: '#f6b118',
                                    color: '#000',
                                    width: '118px',
                                    height: '49px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '5px 10px',
                                    opacity: 1,
                                    transform: 'rotate(0deg)'
                                }}
                            >
                                About
                            </span>
                            <span style={{ color: '#000', fontWeight: 800 }}>the Summit</span>
                        </h2>

                        <p
                            style={{
                                marginTop: '24px',
                                color: '#374151',
                                fontWeight: 400,
                                fontSize: '18px',
                                lineHeight: '30px'
                            }}
                        >
                            The Cardano Africa Tech Summit (CATS) is designed as a
                            <br />
                            full-circle innovation journey, which not only showcases
                            <br />
                            Cardano and related projects, but also activates them in
                            <br />
                            real time through mentorship, onboarding, and practical
                            <br />
                            collaboration.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
