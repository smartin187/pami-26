radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        lancerDecompte()
    }
})
input.onButtonPressed(Button.A, function () {
    lancerDecompte()
})
// Lance le décompte des 85s. Si le fil de lancement est mis, le décompte attendra.
function lancerDecompte () {
    while (input.magneticForce(Dimension.Strength) >= 300) {
        basic.showIcon(IconNames.House)
    }
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
let TEMPS = 0
let pami = 0
wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 105)
pami += 1
TEMPS = 85
basic.showNumber(pami)
