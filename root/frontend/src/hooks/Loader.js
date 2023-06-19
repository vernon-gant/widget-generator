import {MagnifyingGlass} from "react-loader-spinner";

export default function Loader() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
            <MagnifyingGlass
                visible={true}
                height="90"
                width="90"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor='#c0efff'
                color='#e15b64'
            />
        </div>
    );
}