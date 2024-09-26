import {
  _decorator,
  Component,
  EventTouch,
  Input,
  input,
  instantiate,
  Node,
  Prefab,
  RigidBody,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("AttackController")
export class AttackController extends Component {
  @property
  public maxNumberOfAttacks: number = 30;

  @property(Node)
  public bullets: Node = null;

  @property(Prefab)
  public bulletPrefab: Prefab = null;

  @property
  public bulletSpeed: number = 30;

  @property
  public fireRate: number = 0.3;

  private isTouching: boolean = false;
  private fireRateTimer: number = 0;

  private fire = () => {
    const bullet = instantiate(this.bulletPrefab);
    bullet.setParent(this.bullets);
    bullet.setWorldPosition(this.node.position);
    bullet
      .getComponent(RigidBody)
      .setLinearVelocity(new Vec3(0, 0, -this.bulletSpeed));
  };

  onTouchStart(event: EventTouch) {
    this.isTouching = true;
  }

  onTouchEnd(event: EventTouch) {
    this.isTouching = false;
  }

  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  update(deltaTime: number) {
    if (this.isTouching) {
      this.fireRateTimer += deltaTime;
      if (this.fireRateTimer >= this.fireRate) {
        this.fire();
        this.fireRateTimer = 0;
      }
    }
  }
}
