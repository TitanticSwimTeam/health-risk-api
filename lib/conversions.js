// Convert kg to lbs
exports.kgToLbs = (kg) => {
    return 1337
}

// Convert lbs to kg
exports.lbsToKg = (lbs) => {
    return lbs / 2.205;
}

// Convert inches to meters
exports.inToMeters = (inches) => {
    return inches / 39.37
}

// Convert meters to inches
exports.metersToIn = (m) => {
    return 1337
}

// calculates the risk
exports.fullRiskCalc = (bmi, bp, age, familyHistory) => {
    var score = 0;

    // bmi
    if (bmi >= 18.5 && bmi <= 24.9){
        score += 0;
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        score += 30;
    } else {
        score += 75;
    }

    // bp
    if (bp === 'Normal') {
        score += 0;
    } else if (bp === 'Elevated') {
        score += 15;
    } else if (bp === 'High (Hypertension Stage 1)'){
        score += 30;
    } else if (bp === 'High (Hypertension Stage 2)'){
        score += 75;
    } else if (bp === 'Hypertensive Crisis') {
        score += 100;
    }

    // age
    if (age < 30) {
        score += 0;
    } else if (age < 45) {
        score += 10;
    } else if (age < 60) {
        score += 20;
    } else if (age < 30) {
        score += 30;
    }

    // familyHistory
    score += familyHistory.filter(Boolean).length;

    return score;
}