
declare module swipe {
    /**
    * One of RBG(A) styles ("#RRGGBB", "#RGB", "#RRGGBBAA", "#RGBA") or,
    * one of standard color names ("red", "black", "blue", "white", "green", "yellow", "purple", "gray", "darkGray", "lightGray", "brown", "orange", "cyan", "maganta")
    */
    type Color = string;
    /** "NN%" relative to the parent */
    type Percent = string;
    /** SVG-style Path String */
    type Path = string;
    /** relative or absolute URL */
    type URL = string;

    /** @integer */
    interface integer {}
    type NumValue = number|Percent;


    /**
    * A Document is a UTF8 JSON file, which consists of a collection of Pages. The order of Pages in the collection is significant, and they will be presented to the user in the specified order.
    */
    interface Document {
        /** Title of the document, optional */
        title?: string;
        /** Background color, defalut is `darkGray` */
        bc?: Color;
        /** Dimension of the document, default is `[320, 568]` */
        dimension?: [integer, integer];
        /** Paging direction, `vertical` (default), or `leftToRight` */
        paging?: string;
        /** Document orientation, `portrait` (default) or `landscape` */
        orientation?: string;
        /** Named _Scenes_ dictionary */
        scene?: { [name: string]: Scene; };
        /** Named _Elements_ dictionary */
        elements?: { [name: string]: Element; };
        /** Named _Paths_ dictionary */
        paths?: { [name: string]: Path; };
        /** Named _Markdown_ style */
        markdown?: { [name: string]: Style; };
        /** Named _Voice_ style */
        voices?: { [name: string]: VoiceInfo; };
        /** Collection of _Pages_ */
        pages: Page[];
        /** Resource keys for on-demand resources */
        resources?: string[];
        /** Indicate if we need to save&restore view state. The default is `true`. */
        viewstate?: boolean;
    }

    /**
     * Page consists of a collection of Elements. The order of Elements in the collection is significant, those elements will be rendered in the specified order (from bottom to top).
     */
    interface Page {
        /** Background color, the default is `white` */
        bc?: Color;
        /** Frame per second, the default is `60` */
        fpt?: integer;
        /** Inter-page transition style, `scroll` (default), `fadeIn` or `replace` */
        transition?: string;
        /** Play(animation) control, `auto` (default), `pause`, `always` or `scroll` */
        play?: string;
        /** Duration of the animation in seconds, the default is `0.2` seconds */
        duration?: number;
        /** Repeat rule of the animation, default is `false` */
        repeat?: boolean;
        /** Rewind rule of the animation when the user leaves the page, defaul is `false` */
        rewind?: boolean;
        /** Name of the scene, default is `*` */
        scene?: string;
        /** Specifies the sound effect to be played in sync with the animation */
        audio?: URL;
        /** Specifies the text-to-speech to be played in sync with the animation */
        speech?: SpeechInfo;
        /** Specifies the vibration in sync with the animation, the default is `false` */
        vibrate?: boolean;
        /**
         * Collection of _Elements_
         * @minItems 1
         */
        elements?: Element[];
    }

    /**
     * A Scene defines a set of properties and Elements to be shared among multile Pages. It also defines a background music to be played when one of those Pages is active.
     * A Page is always associated with a Scene, either explicity with the "scene" property or implicitly with the default scene with name "*".
     * The Page inherits all the properties from the associated scene, including Elements. When the same property is specified both in the Page and the Scene, the value specified in the Page will be used. The only exception to this rule is Elements, which will be deep-merged (deep-inheritance). Elements with the id property will be merged, and other Elements will be appended (Elements defined in the Scene are always placed below Elements specified in the page).
     */
    interface Scene extends Page {
        /** Specifies the background music to play. */
        bgm?: URL;
    }

    interface AnimatableProperties {
        /** background color, default is `clear`, __animatable__ */
        bc?: Color;
        /** Width of the border, default is `0`, __animatable__ */
        borderWidth?: number;
        /** Color of the border, __animatable__ */
        borderColor?: Color;
        /** Size of the corner radius, __animatable__ */
        cornerRadius?: number;
        /**
         * Opacity of the element, between `0` to `1`, __animatable__
         * @minimum 0
         * @maximum 1
         */
        opacity?: number;
        /** Rotation in degree around the anchor point, clockwise, defalut is `0`, __animatable__ */
        rotate?: number;
        /** Scaling factor around the anchor point, default is `[1, 1]`, __animatable__ */
        scale?: number|[number, number];
        /** Translation, default is `[0, 0]`, __animatable__ */
        translate?: [number, number];
        /** Color of the text, __animatable__ */
        textColor?: Color;
        /** Image to display, __animatable__ */
        img?: URL;
        /** Slot to diplay, __animatable__ */
        slot?: [integer, integer];
        /** Path to display (SVG style), __animatable__ */
        path?: Path;
        /** Color of the stroke, default is `black`, __animatable__ */
        strokeColor?: Color;
        /** Fill color, default is `clear`, __animatable__ */
        fillColor?: Color;
        /** Starting offset, default is `0`, __animatable__ */
        strokeStart?: number;
        /** Ending offset, default is `1`, __animatable__ */
        strokeEnd?: number;
    }

    /**
     * An Element is a visible entity on a Page. It occupies a specified rectangle area within a Page. An Element may contain child Elements.
     */
    interface Element extends AnimatableProperties {
        /** the element identifier to identify an element in the associated _Scene_ */
        id?: string;
        /** the name of the named _Element_ to inherit properties from */
        element?: string;
        /** x-position of the left-top corner of element, default is `0` */
        x?: NumValue;
        /** y-position of the left-top corner of element, default is `0` */
        y?: NumValue;
        /** alternative way to specificy the position by the location of the anchor point */
        pos?: [NumValue, NumValue];
        /** anchor point, default is `["50%", "50%"]` */
        anchor?: [NumValue, NumValue];
        /** width of the element, default is `"100%"` */
        w?: NumValue;
        /** height of the element, default is `"100%"` */
        h?: NumValue;
        /** Specifies clipping behavior, default is `false` */
        clip?: boolean;
        /** Text to display */
        text?: string;
        /** Text alignment, `center` (default), `left` or `right` */
        textAlign?: string;
        /** Font size */
        fontSize?: NumValue;
        /** Image mask (PNG with the alpha channel) */
        mask?: URL;
        /** Sprite to display */
        sprite?: URL;
        /** Dimension of the sprite */
        slice?: [integer, integer];
        /** Width of stroke, default is `0` */
        lineWidth?: number;
        /** Video to play */
        video?: URL;
        /** Radio to play */
        radio?: URL;
        /** Starting point of the video in seconds, default is `0` */
        videoStart?: number;
        /** Ending point of the video in seconds */
        videoDuration?: number;
        /** Specifies if the resource specified with the video tag is stream or not, default is `false` */
        stream?: boolean;
        /** Specifies the Transitional Animation */
        to?: TransitionAnimation;
        /** Specifies the Loop Animation */
        loop?: LoopAnimation;
        /** Specifies the Action */
        action?: string;
    }

    /**
     * The Transition Animation specifies a set of animations to play right after or during the page transition (depending on the "transition" property of the page).
     * The "to" property of each element specifies the animation to be performed on the element, by specifying a new value for animatable properties (such as "opacity", "rotate", "translate", "bc", "path").
     */
    interface TransitionAnimation extends AnimatableProperties {
    }

    const enum LoopStyle {
        /** The _Element_ vibrates left to right, where the "delta" property specifies the distance (the default is `10`) */
        vibrate,
        /** The _Element_ blinks changing its opacity from `1` to `0`. */
        blink,
        /** The _Element_ rotates left and right, where the "delta" property specifies the angree in degree (the default is `15`) */
        wiggle,
        /** The _Element_ performs path animation, where the "path" property specifies a collection of _Paths_. */
        path,
        /** The _Element_ performs a sprite animation. */
        sprite,
    }

    /**
     * The "loop" property of the element specifies the Loop Animation associated with the element. Unlike Transition Animation, it repeats the same animation multiple times specified by the repeat property (the default is 1).
     */
    interface LoopAnimation {
        /** The Loop Animation must have a "style" property */
        style: LoopStyle;
        /** it repeats the same animation multiple times specified by the repeat property (the default is `1`). */
        repeat: integer;
    }

    interface Style {
    }

    interface VoiceInfo {
    }

    interface SpeechInfo {
    }

}

