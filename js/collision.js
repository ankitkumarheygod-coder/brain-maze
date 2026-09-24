export function resolveCircleLineCollision(player, line) {
    // line = {x1, y1, x2, y2, thickness}
    let dx = line.x2 - line.x1;
    let dy = line.y2 - line.y1;
    let len2 = dx * dx + dy * dy;

    // Find closest point on line segment to circle center
    let t = Math.max(0, Math.min(1, ((player.x - line.x1) * dx + (player.y - line.y1) * dy) / len2));
    let closestX = line.x1 + t * dx;
    let closestY = line.y1 + t * dy;

    let distX = player.x - closestX;
    let distY = player.y - closestY;
    let distance = Math.sqrt(distX * distX + distY * distY);

    let minDistance = player.radius + (line.thickness / 2);

    if (distance < minDistance) {
        let overlap = minDistance - distance;
        if (distance === 0) {
            distX = 1; distY = 0; distance = 1;
        }
        // Push player out
        player.x += (distX / distance) * overlap;
        player.y += (distY / distance) * overlap;
        return true;
    }
    return false;
}
