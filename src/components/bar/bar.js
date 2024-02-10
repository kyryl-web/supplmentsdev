import { useEffect, useState } from "react";

import './bar.css';

const Bar = ({barList, pause, pauseDate, disableButtons, activePause, pauseDays}) => {

    const [showPause, setShowPause] = useState(activePause);

    useEffect(() => {
        disableButtons(showPause);
    }, [showPause])

    const elements = barList.map((item, id) => {
        switch(item) {
            case -1: return <li key={id} className="bar_item" style={{backgroundColor: 'red'}}></li>;
            case 0: return <li key={id} className="bar_item" style={{backgroundColor: 'yellow'}}></li>;
            case 1: return <li key={id} className="bar_item" style={{backgroundColor: 'green'}}></li>;
            default: return
        }
    })

    const day = pauseDate.day < 10 ? '0'+pauseDate.day : pauseDate.day;
    const month = pauseDate.month < 10 ? '0'+pauseDate.month : pauseDate.month;
    const year = pauseDate.year;
    const hours = pauseDate.hours < 10 ? '0'+pauseDate.hours : pauseDate.hours;
    const minutes = pauseDate.minutes < 10 ? '0'+pauseDate.minutes : pauseDate.minutes;

    const date = day+'-'+month+'-'+year+'T'+hours+':'+minutes
    
    return (
        <div className="bar">
            { showPause ?
                <>
                    <div className="pause_date">
                        Перерыв с: <span>{date}</span> <span>({pauseDays})</span>

                    </div>
                </>
                 : null
            }
            <button className="pause" onClick={() => {
                pause(showPause);
                setShowPause(showPause => !showPause)
            }}>{!showPause ? 'Перерыв' : 'Возобновить'}</button>
            <ul className="bar_list">
                {elements}
            </ul>
        </div>
    )
}

export default Bar;