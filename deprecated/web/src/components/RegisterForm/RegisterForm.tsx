import { format } from 'date-fns';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FaDiscord } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import './RegisterForm.css';

interface FormData {
    firstname: string;
    lastname: string;
    birthdate: string;
}

const RegisterForm: FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const { firstname, lastname } = data;
        const birthdate = format(new Date(data.birthdate), 'yyyy-MM-dd');

        await fetch('https://alta-core-front/closeRegisterForm', {
            method: 'POST',
            body: JSON.stringify({ firstname, lastname, birthdate }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <div className="registerform animate__animated animate__fadeInDown">
            <form
                className="form animate__animated animate__fadeIn"
                onSubmit={handleSubmit(onSubmit)}
            >
                <section className="header">
                    <h1 className="title">
                        Begin your{' '}
                        <a
                            href="https://www.quora.com/What-is-GTA-V-RP"
                            target="_blank"
                            rel="noreferrer"
                        >
                            roleplay
                        </a>{' '}
                        adventure here.
                    </h1>
                    <p className="description">
                        In order to fully immerse yourself in the world of
                        roleplaying, it is essential that you create a
                        compelling and well-developed character.
                    </p>
                </section>

                <section className="field">
                    <label htmlFor="firstName">
                        First name
                        <div className="input-wrapper">
                            <input
                                {...register('firstname')}
                                className="input"
                                type="text"
                                placeholder="Enter your firstname"
                                required
                            />
                        </div>
                    </label>
                </section>

                <section className="field">
                    <label htmlFor="lastName">
                        Last name
                        <div className="input-wrapper">
                            <input
                                {...register('lastname')}
                                className="input"
                                type="text"
                                placeholder="Enter your lastname"
                                required
                            />
                        </div>
                    </label>
                </section>

                <section className="field">
                    <label htmlFor="lastName">
                        Date of Birth
                        <div className="input-wrapper">
                            <input
                                {...register('birthdate')}
                                className="input"
                                type="date"
                                placeholder="Enter your lastname"
                                min="1970-01-01"
                                max="2005-01-30"
                                required
                            />
                        </div>
                    </label>
                </section>

                <section className="submit">
                    <button className="button" type="submit">
                        Create new character
                        <HiOutlineArrowRight className="ml-1 h-6 w-6" />
                    </button>

                    <a
                        className="button"
                        href="https://dsc.gg/altarp"
                        rel="noreferrer"
                        target="_blank"
                    >
                        Join
                        <FaDiscord className="ml-1 h-6 w-6" />
                    </a>
                </section>
            </form>
        </div>
    );
};

export default RegisterForm;
