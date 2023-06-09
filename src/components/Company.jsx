import React, { useState } from 'react';
import GoogleMaps from './GoogleMaps';
import { API } from "../../config/TranslateAPI";

function Company({ company }) {
    const [language, setLanguage] = useState(null);
    const [translation, setTranslation] = useState(null);
    const [translated, setTranslated] = useState(null);

    try {
        API.post("/detect", { q: company.description }).then((response) => {
            // Handle the response data
            response.data.map((res) => (
                setLanguage(res.language)
            ))
        });
    } catch (error) {
        console.error(error);
    }

    try {
        API.post("/translate", { q: company.description, source: language, target: translation }).then((response) => {
            // Handle the response data
            setTranslated(response.data.translatedText)
        });
    } catch (error) {
        console.error(error);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const location = {
        lat: Number(company.lat),
        lng: Number(company.lng)
    };

    const handleTranslation = (lang) => {
        setTranslation(lang);
    };

    return (
        <>
            <div className=" px-10 h-screen flex flex-col mid:justify-center">
                <div>
                    <div className='flex mid:flex-row mid:items-end flex-col justify-between'>
                        <div>
                            <a href={`https://${company.domain}`} className="flex">
                                <img src={company.logo} alt="logo" className="w-12 h-12 rounded" />
                                <div className="text-morning-blue font-nunito xsm:text-5xl text-3xl font-light ml-8 mr-10 transition duration-300 ease-in-out hover:scale-110">{company.name}</div>
                            </a>
                            <div className=' flex h-max items-center'>
                                <div className=" font-nunito font-normal text-morning-blue flex mr-5 rounded-lg w-max h-max">revenue <span className="pl-4 text-text-blue">{company.revenue}</span></div>
                                <div className=" font-nunito font-normal text-morning-blue flex rounded-lg w-max h-max">Workers <span className="pl-4 text-text-blue">{company.workers}</span></div>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                            <span className="text-morning-blue flex self-center">language</span>
                            <button
                                className={`p-2 rounded-md ${translation === 'en' ? 'bg-morning-blue' : 'bg-blue-box'}`}
                                onClick={() => handleTranslation('en')}
                            >
                                <span className={`text-white ${translation === 'en' ? 'font-bold' : ''}`}>English</span>
                            </button>
                            <button
                                className={`p-2 rounded-md ${translation === 'ar' ? 'bg-morning-blue' : 'bg-blue-box'}`}
                                onClick={() => handleTranslation('ar')}
                            >
                                <span className={`text-white ${translation === 'ar' ? 'font-bold' : ''}`}>Arabic</span>
                            </button>
                            <button
                                className={`p-2 rounded-md ${translation === 'ja' ? 'bg-morning-blue' : 'bg-blue-box'}`}
                                onClick={() => handleTranslation('ja')}
                            >
                                <span className={`text-white ${translation === 'ja' ? 'font-bold' : ''}`}>Japanese</span>
                            </button>
                        </div>
                    </div>
                    <div className='h-[2px] my-2 w-full -rotate-180 bg-gradient-to-r from-space-blue via-text-blue-dark to-morning-blue'></div>
                </div>
                <div className="flex mt-10 mid:flex-row flex-col ">
                    <div className="mr-12 mid:w-1/2 w-full">
                        <div className=" flex gap-4 rounded-lg ml-8">
                            <div className="h-max font-nunito font-normal bg-button-blue text-morning-blue flex pl-2 pr-2 p-1 rounded-lg w-max">Founded <span className="pl-4 text-text-blue">{company.founded}</span></div>
                            <div className="h-max font-nunito font-normal bg-button-blue text-morning-blue flex pl-2 pr-2 p-1 rounded-lg w-max">Industry<span className="pl-4 text-text-blue">{company.industryMain}</span></div>
                        </div>
                        <div className="flex mb-6">
                            <div className="text-text-blue h-96 mt-5 pr-8 overflow-y-auto ">{!translated ? company.description : translated}</div>
                            <div className="w-4 h-100 bg-gradient-to-b from-morning-blue to-space-blue"></div>
                        </div>
                        <div className="flex gap-3 mid:pr-16 mb-4 mid:justify-end justify-center">
                            <a href={company.facebook}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill='#5856B5' viewBox="0 0 50 50" width="40px" height="40px"><path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 25.832031 46 A 1.0001 1.0001 0 0 0 26.158203 46 L 31.832031 46 A 1.0001 1.0001 0 0 0 32.158203 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 33 44 L 33 30 L 36.820312 30 L 38.220703 23 L 33 23 L 33 21 C 33 20.442508 33.05305 20.398929 33.240234 20.277344 C 33.427419 20.155758 34.005822 20 35 20 L 38 20 L 38 14.369141 L 37.429688 14.097656 C 37.429688 14.097656 35.132647 13 32 13 C 29.75 13 27.901588 13.896453 26.71875 15.375 C 25.535912 16.853547 25 18.833333 25 21 L 25 23 L 22 23 L 22 30 L 25 30 L 25 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 32 15 C 34.079062 15 35.38736 15.458455 36 15.701172 L 36 18 L 35 18 C 33.849178 18 32.926956 18.0952 32.150391 18.599609 C 31.373826 19.104024 31 20.061492 31 21 L 31 25 L 35.779297 25 L 35.179688 28 L 31 28 L 31 44 L 27 44 L 27 28 L 24 28 L 24 25 L 27 25 L 27 21 C 27 19.166667 27.464088 17.646453 28.28125 16.625 C 29.098412 15.603547 30.25 15 32 15 z" /></svg>
                            </a>
                            <a href={company.linkedin}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill='#5856B5' viewBox="0 0 50 50" width="40px" height="40px"><path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z" /></svg>
                            </a>
                            <a href={company.instagram}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill='#5856B5' viewBox="0 0 50 50" width="40px" height="40px"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" /></svg>
                            </a>
                        </div>
                    </div>
                    <div className="mid:w-1/2 w-full">
                        <div className="flex justify-center">
                            <div className="h-8 font-nunito font-normal text-morning-blue flex pl-2 pr-2 p-1 rounded-lg">City <span className="pl-4 text-text-blue">{company.city.name}</span></div>
                            <div className="h-8 font-nunito font-normal text-morning-blue flex pl-2 pr-2 p-1 rounded-lg">Country <span className="pl-4 text-text-blue">{company.country.name}</span></div>
                        </div>
                        <div className="">
                            <GoogleMaps latitude={location.lat} longitude={location.lng} />
                        </div>
                        <div className="text-stone-50 justify-end flex my-12">
                            <button className="bg-blue-box hover:bg-button-blue text-white font-bold py-2 px-4 rounded-full" onClick={scrollToTop}>Scroll to Top</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Company
