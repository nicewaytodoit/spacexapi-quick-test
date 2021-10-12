import './RocketDetails.css';

export interface IRocketLine {
    title: string;
    field: string;
    value: string;
};

export const RocketLine = ({title, field, value} : IRocketLine) => (
    <div className="rocket_line">
        <label htmlFor={field}>{title}</label>
        <span id={field}>{value}</span>
    </div>
);


export interface IRocket {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    onClose: () => void;
};

const Rocket = ({
    rocket_id,
    rocket_name,
    rocket_type,
    onClose,
} : IRocket) => {

    return (
        <div className="rocket">
            <h3 className="rocket__title">Rocket Details</h3>
            <RocketLine title="Rocket ID:" field="rocket_id" value={rocket_id} />
            <RocketLine title="Rocket Name:" field="rocket_name" value={rocket_name} />
            <RocketLine title="Rocket Type:" field="rocket_type" value={rocket_type} />
            <button
                type="button"
                className="rocket__close"
                onClick={onClose}
            >Close Details</button>
        </div>
    );
};

export default Rocket;
