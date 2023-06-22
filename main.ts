const MAX_ACCELERATION = 1000;
radio.setGroup(3)
radio.setTransmitPower(7)
function calculateMotorSpeeds(xAcceleration: number, yAcceleration: number) {
    let leftMotorSpeed = xAcceleration;
    let rightMotorSpeed = xAcceleration;

    if (yAcceleration < 0) {
        yAcceleration = 0 - yAcceleration;

        if (yAcceleration > MAX_ACCELERATION) {
            leftMotorSpeed = leftMotorSpeed * (MAX_ACCELERATION - yAcceleration) / MAX_ACCELERATION;
        } else {
            rightMotorSpeed = rightMotorSpeed * (MAX_ACCELERATION - yAcceleration) / MAX_ACCELERATION;
        }
    }

    if (xAcceleration > MAX_ACCELERATION) {
        leftMotorSpeed = leftMotorSpeed * (MAX_ACCELERATION - xAcceleration) / MAX_ACCELERATION;
    } else {
        rightMotorSpeed = rightMotorSpeed * (MAX_ACCELERATION - xAcceleration) / MAX_ACCELERATION;
    }

    return [leftMotorSpeed, rightMotorSpeed];
}

basic.forever(function () {
    let xAcceleration = input.acceleration(Dimension.X);
    let yAcceleration = input.acceleration(Dimension.Z);

    let [leftMotorSpeed, rightMotorSpeed] = calculateMotorSpeeds(xAcceleration, yAcceleration);

    radio.sendNumber(leftMotorSpeed * 1000 + rightMotorSpeed);

    basic.pause(1);
});

