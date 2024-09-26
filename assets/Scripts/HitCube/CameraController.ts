import { _decorator, Component, EventTouch, Input, input, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("cameraController")
export class cameraController extends Component {
  onTouchStart(event: EventTouch) {
    console.log("Touch Start" + event.getLocation());
  }

  onTouchEnd(event: EventTouch) {
    console.log("Touch End" + event.getLocation());
  }

  onTouchMove(event: EventTouch) {
    const scale = 0.05;
    const pos = this.node.position;
    this.node.setPosition(
      pos.x + event.getDeltaX() * scale,
      pos.y + event.getDeltaY() * scale,
      pos.z
    );
  }

  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }

  update(deltaTime: number) {}
}
