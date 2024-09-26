import {
  _decorator,
  Collider,
  Component,
  EventKeyboard,
  Input,
  input,
  ITriggerEvent,
  KeyCode,
  RigidBody,
  Vec2,
  Vec3,
} from "cc";
import { Food } from "./Food";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  //   @property
  //   public speed: number = 5;

  @property
  public moveForce: number = 5;

  private moveDirection = Vec2.ZERO;
  private rgd: RigidBody = null;
  private collider: Collider = null;

  protected start(): void {
    this.rgd = this.getComponent(RigidBody);
    this.collider = this.getComponent(Collider);

    this.collider.on("onTriggerEnter", this.onTriggerEnter, this);
    this.collider.on("onTriggerExit", this.onTriggerExit, this);
    this.collider.on("onTriggerStay", this.onTriggerStay, this);
  }

  protected onLoad(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
  }
  protected onDestroy(): void {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.off(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
    this.collider.off("onTriggerEnter", this.onTriggerEnter, this);
    this.collider.off("onTriggerExit", this.onTriggerExit, this);
    this.collider.off("onTriggerStay", this.onTriggerStay, this);
  }
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.moveDirection = new Vec2(
          Math.max(this.moveDirection.x - 1, -1),
          this.moveDirection.y
        );
        break;
      case KeyCode.KEY_D:
        this.moveDirection = new Vec2(
          Math.min(this.moveDirection.x + 1, 1),
          this.moveDirection.y
        );
        break;
      case KeyCode.KEY_W:
        this.moveDirection = new Vec2(
          this.moveDirection.x,
          Math.max(this.moveDirection.y - 1, -1)
        );
        break;
      case KeyCode.KEY_S:
        this.moveDirection = new Vec2(
          this.moveDirection.x,
          Math.min(this.moveDirection.y + 1, 1)
        );
        break;
    }
  }
  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.moveDirection = new Vec2(
          this.moveDirection.x + 1,
          this.moveDirection.y
        );
        break;
      case KeyCode.KEY_D:
        this.moveDirection = new Vec2(
          this.moveDirection.x - 1,
          this.moveDirection.y
        );
        break;
      case KeyCode.KEY_W:
        this.moveDirection = new Vec2(
          this.moveDirection.x,
          this.moveDirection.y + 1
        );
        break;
      case KeyCode.KEY_S:
        this.moveDirection = new Vec2(
          this.moveDirection.x,
          this.moveDirection.y - 1
        );
        break;
    }
  }
  onKeyPressing(event: EventKeyboard) {}

  onTriggerEnter(event: ITriggerEvent) {
    const food = event.otherCollider.node.getComponent(Food);
    if (food) {
      food.node.destroy();
    }
  }
  onTriggerExit(event: ITriggerEvent) {}
  onTriggerStay(event: ITriggerEvent) {}

  protected update(dt: number): void {
    // const pos = this.node.position;
    // this.node.setPosition(
    //   pos.x + this.moveDirection.x * this.speed * dt,
    //   pos.y,
    //   pos.z + this.moveDirection.y * this.speed * dt
    // );
    this.rgd.applyForce(
      new Vec3(this.moveDirection.x, 0, this.moveDirection.y).multiplyScalar(
        this.moveForce
      )
    );
  }
}
