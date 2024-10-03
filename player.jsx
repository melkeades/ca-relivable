'use client'
var __defProp = Object.defineProperty
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __defNormalProp = (obj, key, value) =>
  key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : (obj[key] = value)
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop])
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop])
    }
  return a
}
var __objRest = (source, exclude) => {
  var target = {}
  for (var prop in source) if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop]
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop]
    }
  return target
}
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    var rejected = (value) => {
      try {
        step(generator.throw(value))
      } catch (e) {
        reject(e)
      }
    }
    var step = (x) => (x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected))
    step((generator = generator.apply(__this, __arguments)).next())
  })
}

// src/components/player/StandAlonePlayer.tsx
import { useEffect as useEffect6, useMemo, useRef as useRef4, useState as useState7 } from 'react'
import { clippingEvents } from '@coconut-xr/koestlich'
import { getInputSourceId } from '@coconut-xr/natuerlich'
import { PointerController, XRCanvas } from '@coconut-xr/natuerlich/defaults'
import { useXR as useXR3 } from '@coconut-xr/natuerlich/react'
import Hls from 'hls.js'
import { useInputSources } from '@coconut-xr/natuerlich/react'

// src/components/360videoplayer/imageMesh.tsx
import { Sphere, useTexture } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { BackSide } from 'three'
var ImageMesh = ({ src, onPointerDown, onPointerUp, setImageReady, mediaId, isXR }) => {
  console.log('Set Image Ready')
  console.log(setImageReady)
  const _texture = useTexture(src, (loader) => {
    if (setImageReady) {
      setImageReady(true)
    }
  })
  const meshRef = useRef()
  const [isAnimating, setIsAnimating] = useState(true)
  const imageBuffer = []
  useEffect(() => {
    let animationFrameId
    const animate = () => {
      if (isAnimating && meshRef.current && isXR) {
        meshRef.current.rotation.y += 2e-3
        if (meshRef.current.rotation.y >= Math.PI * 2) {
          meshRef.current.rotation.y = Math.PI * 2
          meshRef.current.rotation.y = 0
        }
        animationFrameId = requestAnimationFrame(animate)
      }
    }
    animate()
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (setImageReady) {
        setImageReady(true)
      }
    }
  }, [isAnimating])
  useEffect(() => {
    if (mediaId) {
      if (!imageBuffer.length) {
        imageBuffer.push(1e3)
      }
    }
  }, [])
  const handleUserPan = () => {
    setIsAnimating(false)
  }
  useEffect(() => {
    setIsAnimating(true)
    onPointerDown()
  }, [])
  return (
    <Sphere args={[100, 100, 100]} scale-x={-1} ref={meshRef} onPointerMove={handleUserPan} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <meshBasicMaterial map={_texture} toneMapped={false} side={BackSide} />
    </Sphere>
  )
}
var ImageMesh_default = ImageMesh

// src/components/player/StandAlonePlayer.tsx
import { useThree as useThree2, useFrame } from '@react-three/fiber'
import { Euler, Matrix4, Vector3 as Vector32 } from 'three'
import { OrbitControls, Sphere as Sphere2 } from '@react-three/drei'
import { Loader2 } from 'lucide-react'
import { BackSide as BackSide3, VideoTexture } from 'three'
import { SnackbarProvider } from 'notistack'
import { usePathname } from 'next/navigation'

import React from 'react'

// src/components/player/NewControls.tsx
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect as useEffect2, useState as useState2, useRef as useRef2 } from 'react'
import { useEnterXR, useXR, useSessionSupported } from '@coconut-xr/natuerlich/react'

// src/lib/utils.ts
import { clsx } from 'clsx'

// ../../node_modules/.pnpm/tailwind-merge@2.5.2/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = '-'
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config)
  const { conflictingClassGroups, conflictingClassGroupModifiers } = config
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR)
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift()
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className)
  }
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || []
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]]
    }
    return conflicts
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds,
  }
}
var getGroupRecursive = (classParts, classPartObject) => {
  var _a
  if (classParts.length === 0) {
    return classPartObject.classGroupId
  }
  const currentClassPart = classParts[0]
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart)
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart
  }
  if (classPartObject.validators.length === 0) {
    return void 0
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR)
  return (_a = classPartObject.validators.find(({ validator }) => validator(classRest))) == null ? void 0 : _a.classGroupId
}
var arbitraryPropertyRegex = /^\[(.+)\]$/
var getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1]
    const property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(':'))
    if (property) {
      return 'arbitrary..' + property
    }
  }
}
var createClassMap = (config) => {
  const { theme, prefix } = config
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: [],
  }
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix)
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme)
  })
  return classMap
}
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition)
      classPartObjectToEdit.classGroupId = classGroupId
      return
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme)
        return
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId,
      })
      return
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme)
    })
  })
}
var getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: [],
      })
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart)
  })
  return currentClassPartObject
}
var isThemeGetter = (func) => func.isThemeGetter
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]))
      }
      return classDefinition
    })
    return [classGroupId, prefixedClassGroup]
  })
}
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {},
    }
  }
  let cacheSize = 0
  let cache = /* @__PURE__ */ new Map()
  let previousCache = /* @__PURE__ */ new Map()
  const update = (key, value) => {
    cache.set(key, value)
    cacheSize++
    if (cacheSize > maxCacheSize) {
      cacheSize = 0
      previousCache = cache
      cache = /* @__PURE__ */ new Map()
    }
  }
  return {
    get(key) {
      let value = cache.get(key)
      if (value !== void 0) {
        return value
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value)
        return value
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value)
      } else {
        update(key, value)
      }
    },
  }
}
var IMPORTANT_MODIFIER = '!'
var createParseClassName = (config) => {
  const { separator, experimentalParseClassName } = config
  const isSeparatorSingleCharacter = separator.length === 1
  const firstSeparatorCharacter = separator[0]
  const separatorLength = separator.length
  const parseClassName = (className) => {
    const modifiers = []
    let bracketDepth = 0
    let modifierStart = 0
    let postfixModifierPosition
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index]
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index))
          modifierStart = index + separatorLength
          continue
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index
          continue
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++
      } else if (currentCharacter === ']') {
        bracketDepth--
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart)
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition,
    }
  }
  if (experimentalParseClassName) {
    return (className) =>
      experimentalParseClassName({
        className,
        parseClassName,
      })
  }
  return parseClassName
}
var sortModifiers = (modifiers) => {
  if (modifiers.length <= 1) {
    return modifiers
  }
  const sortedModifiers = []
  let unsortedModifiers = []
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === '['
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier)
      unsortedModifiers = []
    } else {
      unsortedModifiers.push(modifier)
    }
  })
  sortedModifiers.push(...unsortedModifiers.sort())
  return sortedModifiers
}
var createConfigUtils = (config) =>
  __spreadValues(
    {
      cache: createLruCache(config.cacheSize),
      parseClassName: createParseClassName(config),
    },
    createClassGroupUtils(config)
  )
var SPLIT_CLASSES_REGEX = /\s+/
var mergeClassList = (classList, configUtils) => {
  const { parseClassName, getClassGroupId, getConflictingClassGroupIds } = configUtils
  const classGroupsInConflict = []
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX)
  let result = ''
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index]
    const { modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName)
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition)
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName)
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? ' ' + result : result)
        continue
      }
      classGroupId = getClassGroupId(baseClassName)
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? ' ' + result : result)
        continue
      }
      hasPostfixModifier = false
    }
    const variantModifier = sortModifiers(modifiers).join(':')
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier
    const classId = modifierId + classGroupId
    if (classGroupsInConflict.includes(classId)) {
      continue
    }
    classGroupsInConflict.push(classId)
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier)
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i]
      classGroupsInConflict.push(modifierId + group)
    }
    result = originalClassName + (result.length > 0 ? ' ' + result : result)
  }
  return result
}
function twJoin() {
  let index = 0
  let argument
  let resolvedValue
  let string = ''
  while (index < arguments.length) {
    if ((argument = arguments[index++])) {
      if ((resolvedValue = toValue(argument))) {
        string && (string += ' ')
        string += resolvedValue
      }
    }
  }
  return string
}
var toValue = (mix) => {
  if (typeof mix === 'string') {
    return mix
  }
  let resolvedValue
  let string = ''
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if ((resolvedValue = toValue(mix[k]))) {
        string && (string += ' ')
        string += resolvedValue
      }
    }
  }
  return string
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils
  let cacheGet
  let cacheSet
  let functionToCall = initTailwindMerge
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst())
    configUtils = createConfigUtils(config)
    cacheGet = configUtils.cache.get
    cacheSet = configUtils.cache.set
    functionToCall = tailwindMerge
    return tailwindMerge(classList)
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList)
    if (cachedResult) {
      return cachedResult
    }
    const result = mergeClassList(classList, configUtils)
    cacheSet(classList, result)
    return result
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments))
  }
}
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || []
  themeGetter.isThemeGetter = true
  return themeGetter
}
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i
var fractionRegex = /^\d+\/\d+$/
var stringLengths = /* @__PURE__ */ new Set(['px', 'full', 'screen'])
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value)
var isArbitraryLength = (value) => getIsArbitraryValue(value, 'length', isLengthOnly)
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value))
var isArbitraryNumber = (value) => getIsArbitraryValue(value, 'number', isNumber)
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value))
var isPercent = (value) => value.endsWith('%') && isNumber(value.slice(0, -1))
var isArbitraryValue = (value) => arbitraryValueRegex.test(value)
var isTshirtSize = (value) => tshirtUnitRegex.test(value)
var sizeLabels = /* @__PURE__ */ new Set(['length', 'size', 'percentage'])
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever)
var isArbitraryPosition = (value) => getIsArbitraryValue(value, 'position', isNever)
var imageLabels = /* @__PURE__ */ new Set(['image', 'url'])
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage)
var isArbitraryShadow = (value) => getIsArbitraryValue(value, '', isShadow)
var isAny = () => true
var getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value)
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1])
    }
    return testValue(result[2])
  }
  return false
}
var isLengthOnly = (value) =>
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
var isNever = () => false
var isShadow = (value) => shadowRegex.test(value)
var isImage = (value) => imageRegex.test(value)
var getDefaultConfig = () => {
  const colors = fromTheme('colors')
  const spacing = fromTheme('spacing')
  const blur = fromTheme('blur')
  const brightness = fromTheme('brightness')
  const borderColor = fromTheme('borderColor')
  const borderRadius = fromTheme('borderRadius')
  const borderSpacing = fromTheme('borderSpacing')
  const borderWidth = fromTheme('borderWidth')
  const contrast = fromTheme('contrast')
  const grayscale = fromTheme('grayscale')
  const hueRotate = fromTheme('hueRotate')
  const invert = fromTheme('invert')
  const gap = fromTheme('gap')
  const gradientColorStops = fromTheme('gradientColorStops')
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions')
  const inset = fromTheme('inset')
  const margin = fromTheme('margin')
  const opacity = fromTheme('opacity')
  const padding = fromTheme('padding')
  const saturate = fromTheme('saturate')
  const scale = fromTheme('scale')
  const sepia = fromTheme('sepia')
  const skew = fromTheme('skew')
  const space = fromTheme('space')
  const translate = fromTheme('translate')
  const getOverscroll = () => ['auto', 'contain', 'none']
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll']
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing]
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing]
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength]
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue]
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top']
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none']
  const getBlendModes = () => [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ]
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch']
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue]
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column']
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue]
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary(),
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [
        {
          aspect: ['auto', 'square', 'video', isArbitraryValue],
        },
      ],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [
        {
          columns: [isTshirtSize],
        },
      ],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [
        {
          'break-after': getBreaks(),
        },
      ],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [
        {
          'break-before': getBreaks(),
        },
      ],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [
        {
          'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'],
        },
      ],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [
        {
          'box-decoration': ['slice', 'clone'],
        },
      ],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [
        {
          box: ['border', 'content'],
        },
      ],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: [
        'block',
        'inline-block',
        'inline',
        'flex',
        'inline-flex',
        'table',
        'inline-table',
        'table-caption',
        'table-cell',
        'table-column',
        'table-column-group',
        'table-footer-group',
        'table-header-group',
        'table-row-group',
        'table-row',
        'flow-root',
        'grid',
        'inline-grid',
        'contents',
        'list-item',
        'hidden',
      ],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [
        {
          float: ['right', 'left', 'none', 'start', 'end'],
        },
      ],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [
        {
          clear: ['left', 'right', 'both', 'none', 'start', 'end'],
        },
      ],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [
        {
          object: ['contain', 'cover', 'fill', 'none', 'scale-down'],
        },
      ],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [
        {
          object: [...getPositions(), isArbitraryValue],
        },
      ],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [
        {
          overflow: getOverflow(),
        },
      ],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [
        {
          'overflow-x': getOverflow(),
        },
      ],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [
        {
          'overflow-y': getOverflow(),
        },
      ],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [
        {
          overscroll: getOverscroll(),
        },
      ],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [
        {
          'overscroll-x': getOverscroll(),
        },
      ],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [
        {
          'overscroll-y': getOverscroll(),
        },
      ],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [
        {
          inset: [inset],
        },
      ],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [
        {
          'inset-x': [inset],
        },
      ],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [
        {
          'inset-y': [inset],
        },
      ],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [
        {
          start: [inset],
        },
      ],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [
        {
          end: [inset],
        },
      ],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [
        {
          top: [inset],
        },
      ],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [
        {
          right: [inset],
        },
      ],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [
        {
          bottom: [inset],
        },
      ],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [
        {
          left: [inset],
        },
      ],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [
        {
          z: ['auto', isInteger, isArbitraryValue],
        },
      ],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [
        {
          basis: getSpacingWithAutoAndArbitrary(),
        },
      ],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [
        {
          flex: ['row', 'row-reverse', 'col', 'col-reverse'],
        },
      ],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [
        {
          flex: ['wrap', 'wrap-reverse', 'nowrap'],
        },
      ],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [
        {
          flex: ['1', 'auto', 'initial', 'none', isArbitraryValue],
        },
      ],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [
        {
          grow: getZeroAndEmpty(),
        },
      ],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [
        {
          shrink: getZeroAndEmpty(),
        },
      ],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [
        {
          order: ['first', 'last', 'none', isInteger, isArbitraryValue],
        },
      ],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [
        {
          'grid-cols': [isAny],
        },
      ],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [
        {
          col: [
            'auto',
            {
              span: ['full', isInteger, isArbitraryValue],
            },
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [
        {
          'col-start': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [
        {
          'col-end': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [
        {
          'grid-rows': [isAny],
        },
      ],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [
        {
          row: [
            'auto',
            {
              span: [isInteger, isArbitraryValue],
            },
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [
        {
          'row-start': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [
        {
          'row-end': getNumberWithAutoAndArbitrary(),
        },
      ],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [
        {
          'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'],
        },
      ],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [
        {
          'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue],
        },
      ],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [
        {
          'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue],
        },
      ],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [
        {
          gap: [gap],
        },
      ],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [
        {
          'gap-x': [gap],
        },
      ],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [
        {
          'gap-y': [gap],
        },
      ],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [
        {
          justify: ['normal', ...getAlign()],
        },
      ],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [
        {
          'justify-items': ['start', 'end', 'center', 'stretch'],
        },
      ],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [
        {
          'justify-self': ['auto', 'start', 'end', 'center', 'stretch'],
        },
      ],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [
        {
          content: ['normal', ...getAlign(), 'baseline'],
        },
      ],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [
        {
          items: ['start', 'end', 'center', 'baseline', 'stretch'],
        },
      ],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [
        {
          self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'],
        },
      ],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [
        {
          'place-content': [...getAlign(), 'baseline'],
        },
      ],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [
        {
          'place-items': ['start', 'end', 'center', 'baseline', 'stretch'],
        },
      ],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [
        {
          'place-self': ['auto', 'start', 'end', 'center', 'stretch'],
        },
      ],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [
        {
          p: [padding],
        },
      ],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [
        {
          px: [padding],
        },
      ],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [
        {
          py: [padding],
        },
      ],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [
        {
          ps: [padding],
        },
      ],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [
        {
          pe: [padding],
        },
      ],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [
        {
          pt: [padding],
        },
      ],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [
        {
          pr: [padding],
        },
      ],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [
        {
          pb: [padding],
        },
      ],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [
        {
          pl: [padding],
        },
      ],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [
        {
          m: [margin],
        },
      ],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [
        {
          mx: [margin],
        },
      ],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [
        {
          my: [margin],
        },
      ],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [
        {
          ms: [margin],
        },
      ],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [
        {
          me: [margin],
        },
      ],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [
        {
          mt: [margin],
        },
      ],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [
        {
          mr: [margin],
        },
      ],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [
        {
          mb: [margin],
        },
      ],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [
        {
          ml: [margin],
        },
      ],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [
        {
          'space-x': [space],
        },
      ],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [
        {
          'space-y': [space],
        },
      ],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [
        {
          w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing],
        },
      ],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [
        {
          'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit'],
        },
      ],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [
        {
          'max-w': [
            isArbitraryValue,
            spacing,
            'none',
            'full',
            'min',
            'max',
            'fit',
            'prose',
            {
              screen: [isTshirtSize],
            },
            isTshirtSize,
          ],
        },
      ],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [
        {
          h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'],
        },
      ],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [
        {
          'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'],
        },
      ],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [
        {
          'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'],
        },
      ],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [
        {
          size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit'],
        },
      ],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [
        {
          text: ['base', isTshirtSize, isArbitraryLength],
        },
      ],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [
        {
          font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber],
        },
      ],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [
        {
          font: [isAny],
        },
      ],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [
        {
          tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue],
        },
      ],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [
        {
          'line-clamp': ['none', isNumber, isArbitraryNumber],
        },
      ],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [
        {
          leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue],
        },
      ],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [
        {
          'list-image': ['none', isArbitraryValue],
        },
      ],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [
        {
          list: ['none', 'disc', 'decimal', isArbitraryValue],
        },
      ],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [
        {
          list: ['inside', 'outside'],
        },
      ],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [
        {
          placeholder: [colors],
        },
      ],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [
        {
          'placeholder-opacity': [opacity],
        },
      ],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [
        {
          text: ['left', 'center', 'right', 'justify', 'start', 'end'],
        },
      ],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [
        {
          text: [colors],
        },
      ],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [
        {
          'text-opacity': [opacity],
        },
      ],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [
        {
          decoration: [...getLineStyles(), 'wavy'],
        },
      ],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [
        {
          decoration: ['auto', 'from-font', isLength, isArbitraryLength],
        },
      ],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [
        {
          'underline-offset': ['auto', isLength, isArbitraryValue],
        },
      ],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [
        {
          decoration: [colors],
        },
      ],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [
        {
          text: ['wrap', 'nowrap', 'balance', 'pretty'],
        },
      ],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [
        {
          indent: getSpacingWithArbitrary(),
        },
      ],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [
        {
          align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue],
        },
      ],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [
        {
          whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'],
        },
      ],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [
        {
          break: ['normal', 'words', 'all', 'keep'],
        },
      ],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [
        {
          hyphens: ['none', 'manual', 'auto'],
        },
      ],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [
        {
          content: ['none', isArbitraryValue],
        },
      ],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [
        {
          bg: ['fixed', 'local', 'scroll'],
        },
      ],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [
        {
          'bg-clip': ['border', 'padding', 'content', 'text'],
        },
      ],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [
        {
          'bg-opacity': [opacity],
        },
      ],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [
        {
          'bg-origin': ['border', 'padding', 'content'],
        },
      ],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [
        {
          bg: [...getPositions(), isArbitraryPosition],
        },
      ],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [
        {
          bg: [
            'no-repeat',
            {
              repeat: ['', 'x', 'y', 'round', 'space'],
            },
          ],
        },
      ],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [
        {
          bg: ['auto', 'cover', 'contain', isArbitrarySize],
        },
      ],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [
        {
          bg: [
            'none',
            {
              'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'],
            },
            isArbitraryImage,
          ],
        },
      ],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [
        {
          bg: [colors],
        },
      ],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [
        {
          from: [gradientColorStopPositions],
        },
      ],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [
        {
          via: [gradientColorStopPositions],
        },
      ],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [
        {
          to: [gradientColorStopPositions],
        },
      ],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [
        {
          from: [gradientColorStops],
        },
      ],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [
        {
          via: [gradientColorStops],
        },
      ],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [
        {
          to: [gradientColorStops],
        },
      ],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [
        {
          rounded: [borderRadius],
        },
      ],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [
        {
          'rounded-s': [borderRadius],
        },
      ],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [
        {
          'rounded-e': [borderRadius],
        },
      ],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [
        {
          'rounded-t': [borderRadius],
        },
      ],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [
        {
          'rounded-r': [borderRadius],
        },
      ],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [
        {
          'rounded-b': [borderRadius],
        },
      ],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [
        {
          'rounded-l': [borderRadius],
        },
      ],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [
        {
          'rounded-ss': [borderRadius],
        },
      ],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [
        {
          'rounded-se': [borderRadius],
        },
      ],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [
        {
          'rounded-ee': [borderRadius],
        },
      ],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [
        {
          'rounded-es': [borderRadius],
        },
      ],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [
        {
          'rounded-tl': [borderRadius],
        },
      ],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [
        {
          'rounded-tr': [borderRadius],
        },
      ],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [
        {
          'rounded-br': [borderRadius],
        },
      ],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [
        {
          'rounded-bl': [borderRadius],
        },
      ],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [
        {
          border: [borderWidth],
        },
      ],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [
        {
          'border-x': [borderWidth],
        },
      ],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [
        {
          'border-y': [borderWidth],
        },
      ],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [
        {
          'border-s': [borderWidth],
        },
      ],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [
        {
          'border-e': [borderWidth],
        },
      ],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [
        {
          'border-t': [borderWidth],
        },
      ],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [
        {
          'border-r': [borderWidth],
        },
      ],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [
        {
          'border-b': [borderWidth],
        },
      ],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [
        {
          'border-l': [borderWidth],
        },
      ],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [
        {
          'border-opacity': [opacity],
        },
      ],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [
        {
          border: [...getLineStyles(), 'hidden'],
        },
      ],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [
        {
          'divide-x': [borderWidth],
        },
      ],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [
        {
          'divide-y': [borderWidth],
        },
      ],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [
        {
          'divide-opacity': [opacity],
        },
      ],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [
        {
          divide: getLineStyles(),
        },
      ],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [
        {
          border: [borderColor],
        },
      ],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [
        {
          'border-x': [borderColor],
        },
      ],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [
        {
          'border-y': [borderColor],
        },
      ],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [
        {
          'border-t': [borderColor],
        },
      ],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [
        {
          'border-r': [borderColor],
        },
      ],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [
        {
          'border-b': [borderColor],
        },
      ],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [
        {
          'border-l': [borderColor],
        },
      ],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [
        {
          divide: [borderColor],
        },
      ],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [
        {
          outline: ['', ...getLineStyles()],
        },
      ],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [
        {
          'outline-offset': [isLength, isArbitraryValue],
        },
      ],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [
        {
          outline: [isLength, isArbitraryLength],
        },
      ],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [
        {
          outline: [colors],
        },
      ],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [
        {
          ring: getLengthWithEmptyAndArbitrary(),
        },
      ],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [
        {
          ring: [colors],
        },
      ],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [
        {
          'ring-opacity': [opacity],
        },
      ],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [
        {
          'ring-offset': [isLength, isArbitraryLength],
        },
      ],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [
        {
          'ring-offset': [colors],
        },
      ],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [
        {
          shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow],
        },
      ],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [
        {
          shadow: [isAny],
        },
      ],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [
        {
          opacity: [opacity],
        },
      ],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [
        {
          'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker'],
        },
      ],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [
        {
          'bg-blend': getBlendModes(),
        },
      ],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [
        {
          filter: ['', 'none'],
        },
      ],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [
        {
          blur: [blur],
        },
      ],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [
        {
          brightness: [brightness],
        },
      ],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [
        {
          contrast: [contrast],
        },
      ],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [
        {
          'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue],
        },
      ],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [
        {
          grayscale: [grayscale],
        },
      ],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [
        {
          'hue-rotate': [hueRotate],
        },
      ],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [
        {
          invert: [invert],
        },
      ],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [
        {
          saturate: [saturate],
        },
      ],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [
        {
          sepia: [sepia],
        },
      ],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [
        {
          'backdrop-filter': ['', 'none'],
        },
      ],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [
        {
          'backdrop-blur': [blur],
        },
      ],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [
        {
          'backdrop-brightness': [brightness],
        },
      ],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [
        {
          'backdrop-contrast': [contrast],
        },
      ],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [
        {
          'backdrop-grayscale': [grayscale],
        },
      ],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [
        {
          'backdrop-hue-rotate': [hueRotate],
        },
      ],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [
        {
          'backdrop-invert': [invert],
        },
      ],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [
        {
          'backdrop-opacity': [opacity],
        },
      ],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [
        {
          'backdrop-saturate': [saturate],
        },
      ],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [
        {
          'backdrop-sepia': [sepia],
        },
      ],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [
        {
          border: ['collapse', 'separate'],
        },
      ],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [
        {
          'border-spacing': [borderSpacing],
        },
      ],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [
        {
          'border-spacing-x': [borderSpacing],
        },
      ],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [
        {
          'border-spacing-y': [borderSpacing],
        },
      ],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [
        {
          table: ['auto', 'fixed'],
        },
      ],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [
        {
          caption: ['top', 'bottom'],
        },
      ],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [
        {
          transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue],
        },
      ],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [
        {
          duration: getNumberAndArbitrary(),
        },
      ],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [
        {
          ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue],
        },
      ],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [
        {
          delay: getNumberAndArbitrary(),
        },
      ],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [
        {
          animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue],
        },
      ],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [
        {
          transform: ['', 'gpu', 'none'],
        },
      ],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [
        {
          scale: [scale],
        },
      ],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [
        {
          'scale-x': [scale],
        },
      ],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [
        {
          'scale-y': [scale],
        },
      ],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [
        {
          rotate: [isInteger, isArbitraryValue],
        },
      ],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [
        {
          'translate-x': [translate],
        },
      ],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [
        {
          'translate-y': [translate],
        },
      ],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [
        {
          'skew-x': [skew],
        },
      ],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [
        {
          'skew-y': [skew],
        },
      ],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [
        {
          origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue],
        },
      ],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [
        {
          accent: ['auto', colors],
        },
      ],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [
        {
          appearance: ['none', 'auto'],
        },
      ],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [
        {
          cursor: [
            'auto',
            'default',
            'pointer',
            'wait',
            'text',
            'move',
            'help',
            'not-allowed',
            'none',
            'context-menu',
            'progress',
            'cell',
            'crosshair',
            'vertical-text',
            'alias',
            'copy',
            'no-drop',
            'grab',
            'grabbing',
            'all-scroll',
            'col-resize',
            'row-resize',
            'n-resize',
            'e-resize',
            's-resize',
            'w-resize',
            'ne-resize',
            'nw-resize',
            'se-resize',
            'sw-resize',
            'ew-resize',
            'ns-resize',
            'nesw-resize',
            'nwse-resize',
            'zoom-in',
            'zoom-out',
            isArbitraryValue,
          ],
        },
      ],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [
        {
          caret: [colors],
        },
      ],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [
        {
          'pointer-events': ['none', 'auto'],
        },
      ],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [
        {
          resize: ['none', 'y', 'x', ''],
        },
      ],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [
        {
          scroll: ['auto', 'smooth'],
        },
      ],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [
        {
          'scroll-m': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [
        {
          'scroll-mx': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [
        {
          'scroll-my': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [
        {
          'scroll-ms': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [
        {
          'scroll-me': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [
        {
          'scroll-mt': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [
        {
          'scroll-mr': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [
        {
          'scroll-mb': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [
        {
          'scroll-ml': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [
        {
          'scroll-p': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [
        {
          'scroll-px': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [
        {
          'scroll-py': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [
        {
          'scroll-ps': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [
        {
          'scroll-pe': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [
        {
          'scroll-pt': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [
        {
          'scroll-pr': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [
        {
          'scroll-pb': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [
        {
          'scroll-pl': getSpacingWithArbitrary(),
        },
      ],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [
        {
          snap: ['start', 'end', 'center', 'align-none'],
        },
      ],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [
        {
          snap: ['normal', 'always'],
        },
      ],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [
        {
          snap: ['none', 'x', 'y', 'both'],
        },
      ],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [
        {
          snap: ['mandatory', 'proximity'],
        },
      ],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [
        {
          touch: ['auto', 'none', 'manipulation'],
        },
      ],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [
        {
          'touch-pan': ['x', 'left', 'right'],
        },
      ],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [
        {
          'touch-pan': ['y', 'up', 'down'],
        },
      ],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [
        {
          select: ['none', 'text', 'all', 'auto'],
        },
      ],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [
        {
          'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue],
        },
      ],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [
        {
          fill: [colors, 'none'],
        },
      ],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [
        {
          stroke: [isLength, isArbitraryLength, isArbitraryNumber],
        },
      ],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [
        {
          stroke: [colors, 'none'],
        },
      ],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [
        {
          'forced-color-adjust': ['auto', 'none'],
        },
      ],
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: [
        'rounded-s',
        'rounded-e',
        'rounded-t',
        'rounded-r',
        'rounded-b',
        'rounded-l',
        'rounded-ss',
        'rounded-se',
        'rounded-ee',
        'rounded-es',
        'rounded-tl',
        'rounded-tr',
        'rounded-br',
        'rounded-bl',
      ],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch'],
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading'],
    },
  }
}
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig)

// src/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// src/components/MaxWidthWrapper.tsx
import { useRouter } from 'next/navigation'
var MaxWidthWrapper = ({ className, children, styles }) => {
  const router = useRouter()
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2 md:px-10', className)} style={styles}>
      {children}
    </div>
  )
}
var MaxWidthWrapper_default = MaxWidthWrapper

// src/components/ui/button.tsx
import * as React2 from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
var buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
var Button = React2.forwardRef((_a, ref) => {
  var _b = _a,
    { className, variant, size, asChild = false } = _b,
    props = __objRest(_b, ['className', 'variant', 'size', 'asChild'])
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

// src/components/player/NewControls.tsx
var sessionOptionsMain = {
  requiredFeatures: ['local-floor'],
  optionalFeatures: ['bounded-floor', 'hand-tracking'],
}
var Controls = ({ moments, isSingle, videoTexture, video, viewOnly, isXR, handleNextClick, handlePrevClick, crm }) => {
  var _a, _b, _c, _d
  const [isPaused, setPaused] = useState2(false)
  const [isMuted, setMuted] = useState2(true)
  const [currentTime, setCurrentTime] = useState2(0)
  const [currentPlaying, setCurrentPlaying] = useState2(0)
  const totalMedia = (_a = moments == null ? void 0 : moments.media) == null ? void 0 : _a.length
  let currentMedia =
    (_c = (_b = moments == null ? void 0 : moments.media) == null ? void 0 : _b[currentPlaying]) != null ? _c : moments == null ? void 0 : moments.media
  if (!((_d = moments == null ? void 0 : moments.media) == null ? void 0 : _d.length)) {
    currentMedia = crm
  }
  const isVR = currentMedia == null ? void 0 : currentMedia.xr
  const enterAR = useEnterXR('immersive-ar', sessionOptionsMain)
  const xrState = useXR.getState()
  const supported = useSessionSupported('immersive-vr')
  const videoElementRef = useRef2(null)
  useEffect2(() => {
    if (video) {
      if (isMuted !== video.muted) {
        video.muted = isMuted
      }
      videoElementRef.current = video
      const updateCurrentTime = () => {
        setCurrentTime(video.currentTime)
      }
      video.addEventListener('timeupdate', updateCurrentTime)
      return () => {
        video.removeEventListener('timeupdate', updateCurrentTime)
      }
    }
  }, [video])
  const handlePausePlay = () => {
    if (videoElementRef.current) {
      if (currentMedia.type === 'video') {
        if (videoElementRef.current.paused) {
          videoElementRef.current.play()
          setPaused(false)
        } else {
          videoElementRef.current.pause()
          setPaused(true)
        }
      } else {
        setPaused(!isPaused)
      }
    }
  }
  const handleMuteUnmute = () => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = !videoElementRef.current.muted
      setMuted(videoElementRef.current.muted)
    }
  }
  const handleSeek = (event) => {
    const newTime = parseFloat(event.target.value)
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  const handleEnterVR = () =>
    __async(void 0, null, function* () {
      try {
        yield enterAR()
      } catch (error) {
        console.error('Failed to enter VR:', error)
      }
    })
  return (
    <div className="fixed left-0 bottom-0 z-30 w-full gradient-controls from-zinc-900 to-zinc-900">
      <MaxWidthWrapper_default className="pb-10 px-4 flex flex-col items-center justify-center">
        <div className="w-full flex flex-row justify-between items-center mb-4">
          {(isXR || (currentMedia == null ? void 0 : currentMedia.type) === 'video' || !isSingle) && (
            <div className="flex gap-2 md:gap-5 items-center justify-center w-full">
              <div className="flex items-center bg-black bg-opacity-20 backdrop-blur-md rounded-full px-4 py-2 justify-center">
                <div className="flex gap-2 md:gap-5">
                  {/* Prev Button */}
                  {!isSingle && totalMedia > 1 && (
                    <div
                      onClick={handlePrevClick}
                      className="inline-flex w-10 h-10 md:w-12 md:h-12 cursor-pointer justify-center items-center gap-2.5 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
                    >
                      <ChevronLeft className="w-6 h-6 text-white z-20" />
                    </div>
                  )}
                  {/* Play/Pause Button */}
                  <div
                    onClick={handlePausePlay}
                    className="w-10 h-10 md:w-12 md:h-12 cursor-pointer justify-center items-center gap-2.5 inline-flex hover:bg-opacity-40 transition-all duration-300 ease-in-out"
                  >
                    {isPaused ? <Play className="md:w-6 md:h-6 w-5 h-5 text-white z-20" /> : <Pause className="md:w-6 md:h-6 w-5 h-5 text-white z-20" />}
                  </div>
                  {/* Next Button */}
                  {!isSingle && totalMedia > 1 && (
                    <div
                      onClick={handleNextClick}
                      className="inline-flex w-10 h-10 md:w-12 md:h-12 cursor-pointer justify-center items-center gap-2.5 hover:bg-opacity-40 transition-all duration-300 ease-in-out"
                    >
                      <ChevronRight className="w-6 h-6 text-white z-20" />
                    </div>
                  )}
                </div>
                {/* Time and Seek Bar */}
                {(crm == null ? void 0 : crm.type) === 'video' && (
                  <div className="w-3/5 flex justify-center items-center">
                    <span className="text-white mr-2" style={{ width: '50px', textAlign: 'center' }}>
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={(video == null ? void 0 : video.duration) || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, white ${
                          (currentTime / (video == null ? void 0 : video.duration)) * 100
                        }%, rgba(255, 255, 255, 0.5) ${(currentTime / (video == null ? void 0 : video.duration)) * 100}%)`,
                        borderRadius: '14px',
                        height: '8px',
                        transition: 'background 0.3s ease',
                      }}
                    />
                    <span className="text-white ml-2" style={{ width: '50px', textAlign: 'center' }}>
                      {formatTime((video == null ? void 0 : video.duration) || 0)}
                    </span>
                  </div>
                )}
                {/* Mute/Unmute Button */}
                <div
                  onClick={handleMuteUnmute}
                  className="w-10 h-10 md:w-12 md:h-12 cursor-pointer justify-center items-center gap-2.5 inline-flex hover:bg-opacity-40 transition-all duration-300 ease-in-out"
                >
                  {isMuted ? <VolumeX className="md:w-6 md:h-6 w-5 h-5 text-white z-20" /> : <Volume2 className="md:w-6 md:h-6 w-5 h-5 text-white z-20" />}
                </div>
                {isVR && supported && !(xrState == null ? void 0 : xrState.session) && (
                  <Button onClick={handleEnterVR} className="rounded-full p-6 text-zinc-900 bg-white hover:bg-white/75">
                    <div className="text-sm font-semibold uppercase leading-tight tracking-wide">Enter VR</div>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper_default>
    </div>
  )
}
var NewControls_default = Controls

// src/components/360videoplayer/Rectangle.tsx
import { useRef as useRef3, useState as useState5, useEffect as useEffect4, Suspense } from 'react'
import { useThree } from '@react-three/fiber'
import {
  Play as Play2,
  Pause as Pause2,
  Volume2 as Volume22,
  VolumeX as VolumeX2,
  ChevronLeft as ChevronLeft2,
  ChevronRight as ChevronRight2,
} from '@coconut-xr/lucide-koestlich'
import { Container as Container4, RootContainer, Text as Text2 } from '@coconut-xr/koestlich'

// src/components/360videoplayer/Glass.tsx
import { Container } from '@coconut-xr/koestlich'
import { makeBorderMaterial } from '@coconut-xr/xmaterials'
import { MeshPhongMaterial } from 'three'
var GlassMaterial = makeBorderMaterial(MeshPhongMaterial, {
  specular: '#555',
  shininess: 100,
})
function Glass(_a) {
  var _b = _a,
    { backgroundColor = 8947848 } = _b,
    props = __objRest(_b, ['backgroundColor'])
  return (
    <Container
      backgroundColor={backgroundColor}
      backgroundOpacity={0.8}
      borderColor={backgroundColor}
      border={4}
      borderOpacity={0.8}
      borderBend={0.3}
      material={GlassMaterial}
      {...props}
    />
  )
}
var Glass_default = Glass

// src/components/360videoplayer/IconButton.tsx
import { Container as Container2 } from '@coconut-xr/koestlich'
import { useState as useState3 } from 'react'
function IconButton(_a) {
  var _b = _a,
    { active, size = 'medium' } = _b,
    props = __objRest(_b, ['active', 'size'])
  const [hoverCount, setHoverCount] = useState3(0)
  const radius = { small: 20, medium: 24, large: 28 }[size]
  return (
    <Container2
      height={2 * radius}
      width={2 * radius}
      borderRadius={radius}
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      backgroundOpacity={active ? 0.2 : hoverCount > 0 ? 0.1 : 0}
      onPointerEnter={() => {}}
      onPointerLeave={() => {}}
      {...props}
    />
  )
}
var IconButton_default = IconButton

// src/components/360videoplayer/RangeBar.tsx
import { Slider } from '@coconut-xr/apfel-kruemel'
import { Container as Container3 } from '@coconut-xr/koestlich'
import { Text } from '@coconut-xr/koestlich'
import { useEffect as useEffect3, useState as useState4 } from 'react'
var Seekbar = ({ video, onClick }) => {
  const [currentTime, setCurrentTime] = useState4(0)
  const [duration, setDuration] = useState4(video.duration)
  useEffect3(() => {
    console.log('Video Changing Duration')
    const handleTimeUpdate = () => setCurrentTime((video == null ? void 0 : video.currentTime) || 0)
    video.addEventListener('timeupdate', handleTimeUpdate)
    if (video.readyState >= 1) {
      setDuration((video == null ? void 0 : video.duration) || 0)
      setCurrentTime((video == null ? void 0 : video.currentTime) || 0)
    }
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [video])
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  const updateProgress = (value) => {
    const newTime = (value / 100) * video.duration
    if (video.readyState >= 2) {
      video.currentTime = newTime
    } else {
      const seekListener = () => {
        video.currentTime = newTime
        video.removeEventListener('canplay', seekListener)
      }
      video.addEventListener('canplay', seekListener)
    }
  }
  const progressValue = duration > 0 ? currentTime / duration : 0
  const width = Math.max(100, duration * 10)
  return (
    <Container3 width={200} height={40} flexDirection="row" alignItems="center">
      <Container3 flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
        <Text color="white">{formatTime(currentTime)}</Text>
        <Container3 width={100} height={40} flexDirection="row" alignItems="center" onPointerEnter={() => {}} onPointerLeave={() => {}}>
          <Slider size="xs" width={100} minWidth={0} range={100} maxWidth={100} onValueChange={updateProgress} value={progressValue * 100} />
        </Container3>
        <Text color="white">{formatTime(duration)}</Text>
      </Container3>
    </Container3>
  )
}
var RangeBar_default = Seekbar

// src/components/360videoplayer/Rectangle.tsx
import { useXR as useXR2 } from '@coconut-xr/natuerlich/react'
import * as THREE from 'three'
var StickyRectangle = ({ moments, isSingle, video, videoRef, videoTexture, originalCameraState, controlsRefrence, handleNextClick, handlePrevClick, crm }) => {
  var _a, _b, _c, _d
  const controlRef = useRef3(null)
  let orbitControls = null
  const { camera, size, scene, gl, controls } = useThree()
  const [isPaused, setPaused] = useState5(false)
  const [isMuted, setMuted] = useState5(true)
  const [currentTime, setCurrentTime] = useState5(0)
  const [currentPlaying, setCurrentPlaying] = useState5(0)
  let currentMedia =
    (_b = (_a = moments == null ? void 0 : moments.media) == null ? void 0 : _a[currentPlaying]) != null ? _b : moments == null ? void 0 : moments.media
  if (!((_c = moments == null ? void 0 : moments.media) == null ? void 0 : _c.length)) {
    currentMedia = crm
  }
  const aspectRatio = size.width / size.height
  const xrState = useXR2.getState()
  const totalMedia = (_d = moments == null ? void 0 : moments.media) == null ? void 0 : _d.length
  const [controlsVisible, setControlsVisible] = useState5(true)
  const [isInteracting, setIsInteracting] = useState5(false)
  const interactionTimeout = useRef3(null)
  const videoElementRef = useRef3(null)
  useEffect4(() => {
    if (video) {
      if (isMuted !== video.muted) {
        video.muted = isMuted
      }
      videoElementRef.current = video
      const updateCurrentTime = () => {
        setCurrentTime(video.currentTime)
      }
      video.addEventListener('timeupdate', updateCurrentTime)
      return () => {
        video.removeEventListener('timeupdate', updateCurrentTime)
      }
    }
  }, [video])
  useEffect4(() => {
    interactionTimeout.current = setTimeout(() => {
      setControlsVisible(false)
    }, 2e3)
    return () => {
      if (interactionTimeout.current) clearTimeout(interactionTimeout.current)
    }
  }, [])
  const handleInteraction = () => {
    setControlsVisible(true)
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current)
    interactionTimeout.current = setTimeout(() => {
      setControlsVisible(false)
    }, 2e3)
  }
  const handleControlInteraction = () => {
    setIsInteracting(true)
    handleInteraction()
  }
  const handleMouseUp = () => {
    setIsInteracting(false)
    handleInteraction()
  }
  useEffect4(() => {
    var _a2
    window.addEventListener('mousemove', handleInteraction)
    window.addEventListener('keydown', handleInteraction)
    ;(_a2 = xrState.session) == null ? void 0 : _a2.addEventListener('select', handleInteraction)
    return () => {
      var _a3
      window.removeEventListener('mousemove', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      ;(_a3 = xrState.session) == null ? void 0 : _a3.removeEventListener('select', handleInteraction)
    }
  }, [xrState])
  const src = video.src
  const type = src.startsWith('blob') ? 'video' : 'photo'
  const handlePausePlay = () => {
    if (videoElementRef.current) {
      if (currentMedia.type === 'video') {
        if (videoElementRef.current.paused) {
          videoElementRef.current.play()
          setPaused(false)
        } else {
          videoElementRef.current.pause()
          setPaused(true)
        }
      } else {
        setPaused(!isPaused)
      }
    }
  }
  const handleMuteUnmute = () => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = !videoElementRef.current.muted
      setMuted(videoElementRef.current.muted)
    }
  }
  const exitVr = () => {
    if (xrState.session) {
      xrState.session
        .end()
        .then(() => {
          console.log('VR session ended.')
          gl.xr.enabled = false
          gl.setAnimationLoop(null)
          if (gl.xr.getSession()) {
            gl.xr.setSession(null)
          }
          if (camera instanceof THREE.PerspectiveCamera) {
            camera.position.set(0, 0, 150)
            camera.lookAt(0, 0, 0)
            camera.rotation.set(0, 0, 0)
            camera.updateProjectionMatrix()
            console.log('Camera position after VR:', camera.position)
            console.log('Camera looking at:', camera.getWorldDirection(new THREE.Vector3()))
          }
          if (controlsRefrence.current) {
            console.log('Reusing existing controls')
            controlsRefrence.current.enabled = true
            controlsRefrence.current.target.set(-30, 0, 0)
            controlsRefrence.current.enablePan = true
            controlsRefrence.current.minPolarAngle = Math.PI / 4
            controlsRefrence.current.maxPolarAngle = Math.PI / 2
            controlsRefrence.current.minDistance = 50
            controlsRefrence.current.maxDistance = 300
            controlsRefrence.current.update()
            console.log('Updated controls target to (-30, 0, 0)')
          }
          const sphereGeometry = new THREE.SphereGeometry(100, 100, 100)
          const sphereMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
            // Ensure video texture is used
            side: THREE.BackSide,
            // Render inside the sphere
          })
          const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
          sphereMesh.scale.set(-1, 1, 1)
          sphereMesh.position.set(0, 0, 0)
          scene.clear()
          scene.add(sphereMesh)
          console.log('Sphere added to the scene with video texture.')
          const renderLoop = () => {
            if (controlsRefrence.current) {
              controlsRefrence.current.update()
            }
            gl.render(scene, camera)
            requestAnimationFrame(renderLoop)
          }
          renderLoop()
        })
        .catch(console.error)
    }
  }
  return (
    <mesh ref={controlRef} position={[0, 2, -6]}>
      {controlsVisible && (
        <group position={[0, 1.5, -0.4]} scale={(Math.min(1, aspectRatio * 20) / 1200) * 20}>
          <Suspense>
            <RootContainer
              anchorX="center"
              anchorY="center"
              sizeX={1200}
              sizeY={700}
              pixelSize={1}
              positionType="relative"
              display="flex"
              flexDirection="row"
              alignItems="stretch"
            >
              <Container4 positionType="absolute" positionLeft={0} positionRight={0} positionBottom={-90} flexDirection="row" justifyContent="center">
                <Glass_default borderRadius={32} padding={8} gapColumn={8} flexDirection="row">
                  {!isSingle && (
                    <IconButton_default onClick={handlePrevClick}>
                      <ChevronLeft2 height={16} width={16} color="white" depth={0} />
                    </IconButton_default>
                  )}
                  <IconButton_default onClick={handlePausePlay}>
                    {isPaused ? <Play2 height={16} width={16} color="white" depth={0} /> : <Pause2 height={16} width={16} color="white" depth={0} />}
                  </IconButton_default>
                  {!isSingle && (
                    <IconButton_default onClick={handleNextClick}>
                      <ChevronRight2 height={16} width={16} color="white" depth={0} />
                    </IconButton_default>
                  )}
                  {type === 'video' && (
                    <Container4 flexDirection="row" justifyContent="center" alignItems="center">
                      <RangeBar_default video={video} />
                    </Container4>
                  )}
                  <IconButton_default onClick={handleMuteUnmute}>
                    {isMuted ? <VolumeX2 height={16} width={16} color="white" depth={0} /> : <Volume22 height={16} width={16} color="white" depth={0} />}
                  </IconButton_default>
                  <Container4
                    width={150}
                    height={48}
                    borderRadius={50}
                    backgroundColor="white"
                    backgroundOpacity={0.8}
                    flexDirection="row"
                    gapColumn={8}
                    padding={6}
                    onClick={() => exitVr()}
                  >
                    <Container4 flexDirection="column" justifyContent="center" alignItems="center" width="100%" flexGrow={1}>
                      <Text2 color="black">Exit VR</Text2>
                    </Container4>
                  </Container4>
                </Glass_default>
              </Container4>
            </RootContainer>
          </Suspense>
        </group>
      )}
    </mesh>
  )
}
var Rectangle_default = StickyRectangle

// src/hooks/useNetworkQuality.tsx
import { useState as useState6, useEffect as useEffect5 } from 'react'
var useNetworkQuality = () => {
  const [networkQuality, setNetworkQuality] = useState6('unknown')
  const calculateDownloadSpeed = () =>
    __async(void 0, null, function* () {
      const testFileUrl = 'https://d2ouax3dvpqfld.cloudfront.net/Empty_Red_Lacquer_Room_4d4d0c2a2b.jpeg'
      const startTime = /* @__PURE__ */ new Date().getTime()
      try {
        const response = yield fetch(testFileUrl)
        const blob = yield response.blob()
        const endTime = /* @__PURE__ */ new Date().getTime()
        const durationInSeconds = (endTime - startTime) / 1e3
        const fileSizeInBits = blob.size * 8
        const speedInKbps = fileSizeInBits / durationInSeconds / 1024
        console.log(`Download Speed: ${speedInKbps.toFixed(2)} Kbps`)
        if (speedInKbps >= 1e4) {
          return 'high'
        } else if (speedInKbps >= 2e3) {
          return 'medium'
        } else {
          return 'low'
        }
      } catch (error) {
        console.error('Error while measuring download speed:', error)
        return 'medium'
      }
    })
  const getNetworkQuality = () =>
    __async(void 0, null, function* () {
      if ('connection' in navigator) {
        const { downlink } = navigator.connection
        console.log('Network Information API detected:', navigator.connection)
        if (downlink >= 10) {
          return 'high'
        } else if (downlink >= 2) {
          return 'medium'
        } else {
          return 'low'
        }
      } else {
        return yield calculateDownloadSpeed()
      }
    })
  useEffect5(() => {
    const updateNetworkQuality = () =>
      __async(void 0, null, function* () {
        const quality = yield getNetworkQuality()
        setNetworkQuality(quality)
      })
    updateNetworkQuality()
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateNetworkQuality)
    }
    return () => {
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateNetworkQuality)
      }
    }
  }, [])
  return networkQuality
}
var useNetworkQuality_default = useNetworkQuality

// src/components/ui/progress.tsx
import * as React5 from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
var Progress = React5.forwardRef((_a, ref) => {
  var _b = _a,
    { className, value } = _b,
    props = __objRest(_b, ['className', 'value'])
  return (
    <ProgressPrimitive.Root ref={ref} className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)} {...props}>
      <ProgressPrimitive.Indicator className="h-full w-full flex-1 bg-white transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

// src/components/player/StandAlonePlayer.tsx
var Player = ({ mediaType, mediaId, viewMedia, moments, isXR, isSingle, viewOnly, standAloneVideoUrl }) => {
  var _a, _b
  const [imageProgress, setImageProgress] = useState7(0)
  const [isImageReady, setImageReady] = useState7(false)
  const [currentPlaying, setCurrentPlaying] = useState7(0)
  const currentMedia = (standAloneVideoUrl == null ? void 0 : standAloneVideoUrl.src)
    ? {
        src: standAloneVideoUrl.src,
        type: standAloneVideoUrl == null ? void 0 : standAloneVideoUrl.type,
        xr: standAloneVideoUrl == null ? void 0 : standAloneVideoUrl.xr,
      }
    : viewMedia || ((_a = moments == null ? void 0 : moments.media) == null ? void 0 : _a[currentPlaying])
  console.log('current media is')
  console.log(currentMedia)
  const networkQuality = useNetworkQuality_default()
  const orbitControlsRefrence = useRef4(null)
  const xrSrc = useMemo(() => {
    if (viewMedia) {
      let src =
        (currentMedia == null ? void 0 : currentMedia.type) === 'photo'
          ? currentMedia == null
            ? void 0
            : currentMedia.srcArray[0]['original']
          : currentMedia == null
          ? void 0
          : currentMedia.src
      return src == null ? void 0 : src.replace(/:$/, '')
    } else if ((moments == null ? void 0 : moments.media.length) > 0 && currentMedia.type === 'photo') {
      const availableKeys = Object.keys((currentMedia == null ? void 0 : currentMedia.srcArray[0]) || {})
      if (networkQuality === 'high') {
        return availableKeys.includes('large')
          ? currentMedia == null
            ? void 0
            : currentMedia.srcArray[0]['large']
          : currentMedia == null
          ? void 0
          : currentMedia.srcArray[0]['original']
      }
      if (networkQuality === 'medium') {
        return availableKeys.includes('medium')
          ? currentMedia == null
            ? void 0
            : currentMedia.srcArray[0]['medium']
          : currentMedia == null
          ? void 0
          : currentMedia.srcArray[0]['original']
      }
      if (networkQuality === 'low') {
        return availableKeys.includes('small')
          ? currentMedia == null
            ? void 0
            : currentMedia.srcArray[0]['small']
          : currentMedia == null
          ? void 0
          : currentMedia.srcArray[0]['original']
      }
      return currentMedia == null ? void 0 : currentMedia.srcArray[0]['original']
    }
    return currentMedia == null ? void 0 : currentMedia.src
  }, [currentMedia, networkQuality, viewMedia])
  const isHLS =
    (xrSrc == null ? void 0 : xrSrc.endsWith('.m3u8')) ||
    (xrSrc == null ? void 0 : xrSrc.includes('.m3u8?token=')) ||
    (xrSrc == null ? void 0 : xrSrc.includes('.m3u8'))
  const inputSources = useInputSources()
  const videoTexture = useRef4()
  const [isVideoReady, setVideoReady] = useState7(false)
  const [isTimerPaused, setTimerPaused] = useState7(false)
  const [timer, setTimer] = useState7(null)
  const [isBuffering, setIsBuffering] = useState7(false)
  const [showShareModal, setShowShareModal] = useState7(false)
  const videoElement = useRef4(null)
  const xrState = useXR3.getState()
  const videoRef = useRef4()
  const pathname = usePathname()
  const [progress, setProgress] = useState7(0)
  const originalCameraState = useRef4({
    position: new Vector32(),
    rotation: new Euler(),
    fov: 50,
    // default fov value
    projectionMatrix: new Matrix4(),
  })
  const MyCameraComponent = ({ sphereRef }) => {
    const { gl, camera } = useThree2()
    const xrState2 = useXR3.getState()
    useFrame(() => {
      if (xrState2.session && sphereRef.current) {
        const xrCamera = gl.xr.getCamera()
        console.log('Camera in VR: ', xrCamera)
        const initialRotation = new Euler(0, 11, 0)
        sphereRef.current.rotation.copy(initialRotation)
      }
    })
    return null
  }
  useEffect6(() => {
    const currentVideoTexture = videoTexture.current
    let currentVideoRef = videoRef.current
    return () => {
      if (currentVideoTexture) {
        currentVideoTexture.dispose()
      }
      if (currentVideoRef) {
        currentVideoRef = null
      }
    }
  }, [pathname])
  useEffect6(() => {
    var _a2
    const vid = document.createElement('video')
    videoElement.current = vid
    vid.src = xrSrc
    vid.crossOrigin = 'Anonymous'
    vid.loop = false
    vid.muted = true
    vid.autoPlay = true
    vid.playsInline = true
    vid.controls = false
    setImageReady(true)
    if (isHLS) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(xrSrc)
        hls.attachMedia(vid)
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          vid.play().then(() => {
            setVideoReady(true)
          })
        })
      } else if ((_a2 = videoElement.current) == null ? void 0 : _a2.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.current.src = xrSrc
        videoElement.current.play()
      }
    } else {
      if (videoElement.current) {
        videoElement.current.src = xrSrc
        videoElement.current.play()
      }
    }
    if (videoTexture && videoElement.current) {
      videoTexture.current = new VideoTexture(videoElement.current)
      videoRef.current = vid
    }
    return () => {
      vid.pause()
      vid.removeAttribute('src')
      vid.load()
      if (videoTexture.current) {
        videoTexture.current.dispose()
        setVideoReady(false)
      }
    }
  }, [currentPlaying, xrSrc])
  useEffect6(() => {
    return () => {
      clearInterval(timer)
      setImageProgress(0)
    }
  }, [timer])
  useEffect6(() => {
    if ((currentMedia == null ? void 0 : currentMedia.type) === 'photo' && isImageReady) {
      const interval = 50
      let currentTime = 0
      const newTimer = setInterval(() => {
        var _a2
        if (!isTimerPaused) {
          currentTime += interval / 1e3
          const newProgress = (currentTime / 5) * 100
          setImageProgress(newProgress)
          if (newProgress >= 100) {
            clearInterval(newTimer)
            if (currentPlaying + 1 < ((_a2 = moments == null ? void 0 : moments.media) == null ? void 0 : _a2.length)) {
              setImageProgress(0)
              setCurrentPlaying(currentPlaying + 1)
            }
          }
        }
      }, interval)
      setTimer(newTimer)
      return () => {
        clearInterval(newTimer)
      }
    }
  }, [xrSrc, currentMedia == null ? void 0 : currentMedia.type, isTimerPaused, isImageReady])
  useEffect6(() => {
    var _a2
    const updateProgress = () => {
      var _a3, _b2, _c, _d, _e, _f, _g
      if (currentMedia && currentMedia.type === 'video') {
        setImageProgress(0)
        if (
          ((_b2 = (_a3 = videoTexture.current) == null ? void 0 : _a3.image) == null ? void 0 : _b2.duration) &&
          ((_d = (_c = videoTexture.current) == null ? void 0 : _c.image) == null ? void 0 : _d.currentTime) !== void 0
        ) {
          const currentTime = videoTexture.current.image.currentTime
          const duration = videoTexture.current.image.duration
          const newProgress = (currentTime / duration) * 100
          setProgress(newProgress)
          if (newProgress >= 97.9 && currentPlaying + 1 < ((_e = moments == null ? void 0 : moments.media) == null ? void 0 : _e.length)) {
            setProgress(0)
            setImageProgress(0)
            setCurrentPlaying(currentPlaying + 1)
          } else if (
            progress >= 97.9 &&
            currentPlaying + 1 === ((_f = moments == null ? void 0 : moments.media) == null ? void 0 : _f.length) &&
            xrState.session
          ) {
            ;(_g = xrState.session) == null ? void 0 : _g.end().catch(console.error)
          }
        }
      }
    }
    const handleLoadedMetadata = () => {
      updateProgress()
    }
    const handleTimeUpdate = () => {
      updateProgress()
    }
    if ((_a2 = videoTexture.current) == null ? void 0 : _a2.image) {
      videoTexture.current.image.addEventListener('loadedmetadata', handleLoadedMetadata)
      videoTexture.current.image.addEventListener('timeupdate', handleTimeUpdate)
      return () => {
        var _a3, _b2
        ;(_a3 = videoTexture == null ? void 0 : videoTexture.current) == null ? void 0 : _a3.image.removeEventListener('loadedmetadata', handleLoadedMetadata)
        ;(_b2 = videoTexture.current) == null ? void 0 : _b2.image.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [videoTexture, currentMedia == null ? void 0 : currentMedia.type])
  const handleNextClick = () => {
    var _a2
    if (currentPlaying + 1 < ((_a2 = moments == null ? void 0 : moments.media) == null ? void 0 : _a2.length)) {
      setCurrentPlaying(currentPlaying + 1)
    }
  }
  const handlePrevClick = () => {
    if (currentPlaying > 0) {
      setCurrentPlaying(currentPlaying - 1)
    }
  }
  const handlePointerDown = () => {
    var _a2
    ;(_a2 = videoElement.current) == null ? void 0 : _a2.pause()
    setTimerPaused(true)
  }
  const handlePointerUp = () => {
    var _a2
    ;(_a2 = videoElement.current) == null ? void 0 : _a2.play()
    setTimerPaused(false)
  }
  return (
    //@ts-ignore
    <>
      <SnackbarProvider preventDuplicate />
      <div className="m-auto flex flex-col items-center justify-center h-auto">
        {/* Ensure that momentName is not undefined */}
        {(moments == null ? void 0 : moments.momentName) && (
          <div className="md:flex text-center text-black text-xl font-normal leading-snug">{moments == null ? void 0 : moments.momentName}</div>
        )}
        {!isSingle &&
          ((_b = moments == null ? void 0 : moments.media) == null
            ? void 0
            : _b.map((item, index) => (
                <div className="flex flex-row gap-1 mt-4 bg-transparent">
                  <div key={index} className="bg-transparent">
                    <Progress
                      color="blue"
                      value={
                        index < currentPlaying
                          ? 100
                          : index > currentPlaying
                          ? 0
                          : (currentMedia == null ? void 0 : currentMedia.type) === 'photo'
                          ? imageProgress
                          : progress
                      }
                      className="h-1 w-14 md:w-16 bg-black/10"
                    />
                  </div>
                </div>
              )))}
      </div>
      {(currentMedia == null ? void 0 : currentMedia.type) === 'photo' && !isImageReady ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ">
          <Loader2 className="animate-spin h-16 w-16 text-zinc-600" />
        </div>
      ) : (
        (currentMedia == null ? void 0 : currentMedia.type) === 'video' &&
        !isVideoReady && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ">
            <Loader2 className="animate-spin h-16 w-16 text-zinc-600" />
          </div>
        )
      )}
      <div className="">
        {xrSrc && (
          <XRCanvas style={{ width: '100vw', height: '100vh' }} events={clippingEvents} gl={{ antialias: true, localClippingEnabled: true }}>
            <>
              {/* device!='iPhone' && device!='iPad' ? (
              <OrbitControls enableRotate={true} target={[-30, 0, 0]} />) : null */}
              {!xrState.session && <OrbitControls enableRotate={true} target={[-30, 0, 0]} />}
              <ambientLight intensity={1} />
              <directionalLight castShadow position={[1, 2, 3]} intensity={2} />
              {inputSources.map((inputSource) => (
                <PointerController id={getInputSourceId(inputSource)} key={getInputSourceId(inputSource)} inputSource={inputSource} />
              ))}
              <pointLight position={[10, 10, 10]} />
              {(currentMedia == null ? void 0 : currentMedia.type) === 'video' ? (
                <Sphere2 args={[100, 100, 100]} scale-x={-1} ref={videoRef}>
                  {isVideoReady && videoTexture.current && (
                    <>
                      <meshBasicMaterial map={videoTexture.current} toneMapped={false} side={BackSide3} />
                    </>
                  )}
                </Sphere2>
              ) : (
                <ImageMesh_default
                  mediaId={mediaId}
                  src={xrSrc}
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  setImageReady={setImageReady}
                  isXR={currentMedia == null ? void 0 : currentMedia.xr}
                />
              )}
            </>
            {xrState.session && (
              <Rectangle_default
                isSingle
                moments={[]}
                video={videoElement.current}
                videoRef={videoRef}
                videoTexture={videoTexture.current}
                originalCameraState={originalCameraState}
                controlsRefrence={orbitControlsRefrence}
                handleNextClick={handleNextClick}
                handlePrevClick={handlePrevClick}
                crm={currentMedia}
              />
            )}
            <MyCameraComponent sphereRef={videoRef} />
          </XRCanvas>
        )}
        <NewControls_default
          videoTexture={videoTexture}
          video={videoElement.current}
          moments={moments}
          isXR={isXR}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          crm={currentMedia}
        />
      </div>
    </>
  )
}
var StandAlonePlayer_default = Player

// src/index.tsx
var ImmersiveVideoPlayer = ({ mediaType, mediaId, viewMedia, moments, isXR, isSingle, viewOnly, standAloneVideoUrl }) => {
  return (
    <StandAlonePlayer_default
      mediaType={mediaType}
      mediaId={mediaId}
      viewMedia={viewMedia}
      moments={moments}
      isXR={isXR}
      isSingle={isSingle}
      viewOnly={viewOnly}
      standAloneVideoUrl={standAloneVideoUrl}
    />
  )
}
var src_default = ImmersiveVideoPlayer
export { src_default as default }
