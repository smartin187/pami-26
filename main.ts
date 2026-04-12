radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == SIGNAL_RADIO) {
        lancerDecompte()
    }
})
input.onButtonPressed(Button.A, function () {
    while (input.magneticForce(Dimension.Strength) >= 300) {
        basic.showIcon(IconNames.House)
    }
    for (let index = 0; index < 4; index++) {
        radio.sendNumber(SIGNAL_RADIO)
        basic.pause(100)
    }
    lancerDecompte()
})
// Lance le décompte des 85s. Si le fil de lancement est mis, le décompte attendra.
function lancerDecompte () {
    basic.showString("OK")
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(TEMPS * 1000)
    basic.showIcon(IconNames.Happy)
    if (pami == 1) {
        basic.pause(2000)
    } else if (pami == 2) {
        basic.pause(1000)
    }
    wuKong.setMotorSpeed(wuKong.MotorList.M1, -50)
    if (pami == 1) {
        basic.pause(4200)
    } else if (pami == 2) {
        basic.pause(5000)
    } else if (pami == 4) {
        basic.pause(3000)
    } else {
        basic.pause(6800)
    }
    wuKong.stopMotor(wuKong.MotorList.M1)
    while (true) {
        if (pami == 4) {
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 85)
            basic.pause(500)
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 105)
            basic.pause(500)
        } else {
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 70)
            basic.pause(500)
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 90)
            basic.pause(500)
        }
    }
}
input.onButtonPressed(Button.B, function () {
    pami += 1
    if (pami == 5) {
        pami = 1
    }
    basic.showNumber(pami)
})
let SIGNAL_RADIO = 0
let TEMPS = 0
let pami = 0
wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 105)
pami += 1
TEMPS = 85
SIGNAL_RADIO = 38330
basic.showNumber(pami)
radio.setTransmitPower(7)
radio.setFrequencyBand(0)
// Changer le groupe pour limiter les interférence. Groupe par défaut sur micro:bit : 0 ou 1
radio.setGroup(6)
