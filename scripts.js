// 설정 값 (초 단위)
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

// DOM 요소
const timeDisplay = document.getElementById('time-display');
const modeText = document.getElementById('mode-text');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// 상태 변수
let timeLeft = WORK_TIME;
let timerInterval = null;
let isWorking = true;
let isRunning = false;

// 화면에 시간을 포맷팅하여 표시하는 함수 (MM:SS)
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timeDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - 뽀모도로`;
}

// 타이머 모드(집중/휴식) 전환 함수
function switchMode() {
    isWorking = !isWorking;
    timeLeft = isWorking ? WORK_TIME : BREAK_TIME;

    modeText.textContent = isWorking ? '집중 시간' : '휴식 시간';

    if (isWorking) {
        document.body.classList.remove('break-mode');
    } else {
        document.body.classList.add('break-mode');
    }

    updateDisplay();
}

// 타이머 시작 함수
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            isRunning = false;
            switchMode();
            // 모드 전환 후 자동으로 시작하려면 아래 주석 해제
            // startTimer(); 
        }
    }, 1000);
}

// 타이머 일시정지 함수
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// 타이머 초기화 함수
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = isWorking ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

// 이벤트 리스너 등록
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// 초기 화면 설정
updateDisplay();