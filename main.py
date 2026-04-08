def on_received_number(receivedNumber):
    if receivedNumber == SIGNAL_RADIO:
        lancerDecompte()
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    while input.magnetic_force(Dimension.STRENGTH) >= 300:
        basic.show_icon(IconNames.HOUSE)
    radio.send_number(SIGNAL_RADIO)
    lancerDecompte()
input.on_button_pressed(Button.A, on_button_pressed_a)

# Lance le décompte des 85s. Si le fil de lancement est mis, le décompte attendra.
def lancerDecompte():
    basic.show_string("OK")
    basic.show_leds("""
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        """)
    basic.pause(TEMPS * 1000)
    basic.show_icon(IconNames.HAPPY)
    if pami == 1:
        basic.pause(2000)
    elif pami == 2:
        basic.pause(1000)
    wuKong.set_motor_speed(wuKong.MotorList.M1, -50)
    if pami == 1:
        basic.pause(4200)
    elif pami == 2:
        basic.pause(5000)
    elif pami == 4:
        basic.pause(3000)
    else:
        basic.pause(6800)
    wuKong.stop_motor(wuKong.MotorList.M1)
    while True:
        if pami == 4:
            wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 85)
            basic.pause(500)
            wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 105)
            basic.pause(500)
        else:
            wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 70)
            basic.pause(500)
            wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 90)
            basic.pause(500)

def on_button_pressed_b():
    global pami
    pami += 1
    if pami == 5:
        pami = 1
    basic.show_number(pami)
input.on_button_pressed(Button.B, on_button_pressed_b)

SIGNAL_RADIO = 0
TEMPS = 0
pami = 0
wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 105)
pami += 1
TEMPS = 85
SIGNAL_RADIO = 38330
basic.show_number(pami)
radio.set_transmit_power(7)
radio.set_frequency_band(0)
radio.set_group(1)